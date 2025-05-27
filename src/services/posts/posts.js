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

            console.log('SERVICE ----- createPosts --- postData: ', postData)
            const response = await this.#client.request({
                method: 'POST',
                path: '/posts',
                body: postData
            }, {
                timeout: 10000,
            })
            console.log('SERVICE ----- createPosts --- response: ', response)

            return response;
        }
    
     async getPosts() {

            console.log('-----GETPOSTS: ', '1111111111')

            const response = await this.#client.request({
                method: 'GET',
                path: '/posts',
            }, {
                timeout: 15000
            })

            console.log('-----GETPOSTS: ', '222222222222')


            console.log('-----GETPOSTS ---- response: ', response)


            const posts = []

            for (const post of response ){
                posts.push({
                    id: post.id,
                    authorId: post.authorId,
                    title: post.title,
                })
            }

            console.log('-----GETPOSTS ---- posts: ', posts)


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