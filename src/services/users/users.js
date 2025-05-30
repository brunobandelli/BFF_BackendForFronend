const Http = require("../../utils/http");

class UsersService {
    #client;

    constructor() {
        this.#client = new Http('http://users:3003');
    }
    
    /**
     * @param {number[]} ids 
     */

      async getUsers(ids) {
            const data = await this.#client.request({
                method: 'GET',
                path: '/users',
                query: { id: ids }
            }, {
                timeout: 3000,  //Esse timeout eh para simular situações reais de espera da requisição.
            });

            const users = new Map()

            for (const comment of data) {
                users.set(comment.id, comment.name)
            }

            return users;
        }
}
    
module.exports = UsersService