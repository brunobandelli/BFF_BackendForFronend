const Http = require("../../utils/http");

class PostsService {
    #client;

    constructor() {
        this.#client = new Http('http://posts:3001');
    }

    /**
     * @param {object} postData 
     */

     async createPosts(postData) {

            const response = await this.#client.request({
                method: 'POST',
                path: '/posts',
                body: postData
            }, {
                timeout: 10000,
            })

            return response;
        }
    
     async getPosts() {

            const response = await this.#client.request({
                method: 'GET',
                path: '/posts',
            }, {
                timeout: 15000 //Esse timeout eh para simular situações reais de espera da requisição.
            })

            const posts = []

            for (const post of response ){
                posts.push({
                    id: post.id,
                    authorId: post.authorId,
                    title: post.title,
                })
            }

            return posts;
        }


     /**
     * @param {number} id 
     */

     async getPost(id) {

            const data = await this.#client.request({
                method: 'GET',
                path: `/posts/${id}`,
            }, {
                timeout: 5000,
            })

            return {
                id: data.id,
                title: data.title,
                text: data.text,
                authorId: data.authorId,
            };
        }
}
    
module.exports = PostsService