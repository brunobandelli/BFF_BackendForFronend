const CreatePostsInteractor = require("../Iteractors/createPosts.interactor");
const FetchPostByIdInteractor = require("../Iteractors/fetchPostById.interactor");

const createPostsInteractor = new CreatePostsInteractor()
const fetchPostByIdInteractor = new FetchPostByIdInteractor()
class PostsController {

    /**
     * @typedef {Object} PostData
     * @property {string} authorId
     * @property {string} title
     * @property {string} text
     */

    /**
     * @param {PostData} body
     */

    async createPosts(body) {
        console.log('CONTROLLERS --- createPosts --- body: ', body)
        const data = await createPostsInteractor.execute(body)
        console.log('CONTROLLERS --- createPosts --- data: ', data)

        return data
    }


    /**
     * @param {number} id
     */

    async getPost(id) {
        console.log('CONTROLLERS --- getPost --- id: ', id);

        const data = await fetchPostByIdInteractor.execute(id);

        console.log('CONTROLLERS --- getPost --- data: ', data);

        return data;
    }


}

module.exports = PostsController

