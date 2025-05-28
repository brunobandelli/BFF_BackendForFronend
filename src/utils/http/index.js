const { setTimeout } = require('timers/promises')
const { Client } = require('undici')
const TimeoutException = require('./exceptions/TimeoutException')

//Tratamento de requisições feitas para os serviços, para falharem com antecidencia evitando esperas longas.
//Usando os conceitos do AbortController.
//Site de referencia: https://nearform.com/insights/using-abortsignal-in-node-js/
class Http {
    #client;

    /**
    * @param {string} url
    */
    constructor(url) {
        this.#client = new Client(url);
    }

    /**
     * @param {import('undici').Dispatcher.ResponseData} params
     * @param {{timeout: number}} options
     */
    async request(params, { timeout } = {}) {
        const cancelTimeout = new AbortController();
        const cancelRequest = new AbortController();
        try {
            const response = await Promise.race([
                this.#makeRequest(params, { cancelTimeout, cancelRequest }),
                this.#timeout(timeout, { cancelTimeout, cancelRequest }),
            ]);

            return response
        } catch (error) {
            if (error instanceof TimeoutException) {
                console.log('Timeout exceeded')
            }

            throw error
        }
    }

    async #makeRequest(params, { cancelTimeout, cancelRequest }) {
        try {

            const { body, ...rest } = params;
            const response = await this.#client.request({
                ...rest,
                signal: cancelRequest.signal,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    ...params.headers,
                },
            });

            if (response.statusCode < 200 || response.statusCode >= 300) {
                throw new Error(`Request failed with status ${response.statusCode}`);
            }

            const data = await response.body.json();

            return data;
        } finally {
            cancelTimeout.abort();
        }
    }

    async #timeout(delay, { cancelTimeout, cancelRequest }) {
        try {
            await setTimeout(delay, undefined, { signal: cancelTimeout.signal });
            cancelRequest.abort()
        } catch (error) {
            return;
        }

        throw new TimeoutException();

    }
}

module.exports = Http