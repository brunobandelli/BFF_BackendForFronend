const PostsService = require("../services/posts/posts");

class CreatePostsInteractor {
  constructor() {
    this.postsService = new PostsService();
  }

  /**
   * @param {object} body Dados do post
   * @returns {Promise<object>} Post criado
   */
  async execute(body) {
    console.log('INTERACTOR --- createPosts --- body: ', body);

    // 1. Validação de campos obrigatórios
    const requiredFields = ['authorId', 'title', 'text'];
    const missingFields = requiredFields.filter(field => !body[field] && body[field] !== 0);

    if (missingFields.length > 0) {
      const msg = `Missing required field(s): ${missingFields.join(', ')}`;
      console.error('INTERACTOR --- createPosts --- validation error: ', msg);
      throw new Error(msg);
    }

    // 2. Buscar posts atuais
    const posts = await this.postsService.getPosts();
    console.log('INTERACTOR --- createPosts --- posts: ', posts);

    // 3. Calcular o próximo id baseado no maior id dos posts existentes
    const nextId = posts.length === 0
      ? 1
      : posts.reduce((max, post) => (post.id > max ? post.id : max), 0) + 1;

    // 4. Montar o novo post com id
    const newPost = {
      id: nextId,
      ...body
    };

    // 5. Criar o post (salvar)
    const data = await this.postsService.createPosts(newPost);
    console.log('INTERACTOR --- createPosts --- data: ', data);

    return data;
  }
}

module.exports = CreatePostsInteractor;
