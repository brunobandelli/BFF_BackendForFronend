// createPostsInteractor.test.js

const CreatePostsInteractor = require("./createPosts.interactor");

describe("CreatePostsInteractor", () => {
    let interactor;
    let mockPostsService;

    beforeEach(() => {
        mockPostsService = {
            getPosts: jest.fn(),
            createPosts: jest.fn(),
        };

        interactor = new CreatePostsInteractor();
        interactor.postsService = mockPostsService;
    });

    it("should throw an error if any required field is missing", async () => {
        const invalidBody = { title: "Titulo sem authorId e text" };
        await expect(interactor.execute(invalidBody))
            .rejects
            .toThrow("Missing required field(s): authorId, text");
    });

    it("should create a post with id 1 if no posts exist", async () => {
        mockPostsService.getPosts.mockResolvedValue([]);
        const newPost = { authorId: 1, title: "Titulo", text: "Conteudo" };
        mockPostsService.createPosts.mockResolvedValue({ id: 1, ...newPost });

        const result = await interactor.execute(newPost);

        expect(mockPostsService.getPosts).toHaveBeenCalled();
        expect(mockPostsService.createPosts).toHaveBeenCalledWith({ id: 1, ...newPost });
        expect(result).toEqual({ id: 1, ...newPost });
    });

it("should create a post with the correct id based on existing posts", async () => {
        const existingPosts = [
            { id: 1, authorId: 1, title: "x", text: "x" },
            { id: 3, authorId: 2, title: "y", text: "y" },
            { id: 2, authorId: 3, title: "z", text: "z" },
        ];
        mockPostsService.getPosts.mockResolvedValue(existingPosts);

        const newPost = { authorId: 4, title: "Novo", text: "Conteudo novo" };
        mockPostsService.createPosts.mockResolvedValue({ id: 4, ...newPost });

        const result = await interactor.execute(newPost);

        expect(mockPostsService.getPosts).toHaveBeenCalled();
        expect(mockPostsService.createPosts).toHaveBeenCalledWith({ id: 4, ...newPost });
        expect(result).toEqual({ id: 4, ...newPost });
    });
});
