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
        const data = await createPostsInteractor.execute(body)
        return data
    }


    /**
     * @param {number} id
     */

    async getPost(id) {
        const data = await fetchPostByIdInteractor.execute(id);

        return data;
    }


}

module.exports = PostsController

