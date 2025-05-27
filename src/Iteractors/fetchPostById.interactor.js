const PostsService = require("../services/posts/posts");
const CommentsService = require("../services/comments/comments");
const UsersService = require("../services/users/users");

class FetchPostByIdInteractor {
  constructor() {
    this.postsService = new PostsService();
    this.commentsService = new CommentsService();
    this.usersService = new UsersService();
  }

  /**
   * @param {number} id ID do post
   * @returns {Promise<object>} Post com comentários e dados dos usuários
   */
  async execute(id) {
    try {

      // 1. Buscar post e comentários
      const [post, dataComments] = await Promise.all([
        this.postsService.getPost(id),
        this.commentsService.getComments(id)
      ]);

      // 2. Garantir que sempre haja comentários (mock caso necessário)
      const comments = (dataComments && dataComments.length > 0)
        ? dataComments
        : await this.commentsService.getComments(1); // Mock para testes, para usar todos os serviços como demonstração.

      // 3. Construir set com os IDs únicos de usuários
      const userIds = new Set([post.authorId]);
      for (const comment of comments) {
        userIds.add(comment.userId);
      }

      // 4. Buscar dados dos usuários
      const users = await this.usersService.getUsers([...userIds]);

      // 5. Associar usuário ao autor do post
      post.author = users.get(post.authorId);

      // 6. Associar usuários aos comentários
      for (const comment of comments) {
        comment.user = users.get(comment.userId);
        comment.userId = undefined; // Remover userId após associação
      }

      return {
        ...post,
        comments
      };

    } catch (error) {
      throw new Error('Fail to fetch post');
    }
  }
}

module.exports = FetchPostByIdInteractor;
