const Http = require("../../utils/http");

class CommentsService {
    #client;

    constructor() {
        this.#client = new Http('http://comments:3002');
    }
    
    /**
     * @param {number} postId 
     * @param {number} limit
     */

     async getComments(postId, limit = 5) {
            try {
                const data = await this.#client.request({
                method: 'GET',
                path: '/comments',
                query: {postId}
            }, {
                timeout: 5000, //Esse timeout eh para simular situações reais de espera da requisição.
            })

            const comments = []

            for (const comment of data) {
                if (comments.length >= limit)continue

                comments.push({
                    id: comment.id,
                    text: comment.text,
                    userId: comment.userId,
                })
            }

            return comments;
            } catch (error) {
                return [];
            }
        }
}
    
module.exports = CommentsService