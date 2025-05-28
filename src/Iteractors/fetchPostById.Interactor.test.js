// fetchPostByIdInteractor.test.js

const FetchPostByIdInteractor = require("./fetchPostById.interactor");

describe("FetchPostByIdInteractor", () => {
  let interactor;
  let mockPostsService;
  let mockCommentsService;
  let mockUsersService;

  beforeEach(() => {
    mockPostsService = {
      getPost: jest.fn(),
    };
    mockCommentsService = {
      getComments: jest.fn(),
    };
    mockUsersService = {
      getUsers: jest.fn(),
    };

    interactor = new FetchPostByIdInteractor();
    interactor.postsService = mockPostsService;
    interactor.commentsService = mockCommentsService;
    interactor.usersService = mockUsersService;
  });

  it("should fetch post with comments and user data", async () => {
    const postId = 1;

    const post = { id: postId, authorId: 10, title: "Test Post" };
    const comments = [
      { id: 1, postId, userId: 20, text: "Comment 1" },
      { id: 2, postId, userId: 30, text: "Comment 2" },
    ];

    const usersMap = new Map([
      [10, { id: 10, name: "Author User" }],
      [20, { id: 20, name: "Commenter 1" }],
      [30, { id: 30, name: "Commenter 2" }],
    ]);

    mockPostsService.getPost.mockResolvedValue(post);
    mockCommentsService.getComments.mockResolvedValue(comments);
    mockUsersService.getUsers.mockResolvedValue(usersMap);

    const result = await interactor.execute(postId);

    expect(mockPostsService.getPost).toHaveBeenCalledWith(postId);
    expect(mockCommentsService.getComments).toHaveBeenCalledWith(postId);
    expect(mockUsersService.getUsers).toHaveBeenCalledWith([10, 20, 30]);

    expect(result).toEqual({
      id: postId,
      authorId: 10,
      title: "Test Post",
      author: { id: 10, name: "Author User" },
      comments: [
        { id: 1, postId, text: "Comment 1", user: { id: 20, name: "Commenter 1" }, userId: undefined },
        { id: 2, postId, text: "Comment 2", user: { id: 30, name: "Commenter 2" }, userId: undefined },
      ],
    });
  });

  it("should use fallback comments if no comments exist", async () => {
    const postId = 1;
    const post = { id: postId, authorId: 10, title: "Test Post" };

    const fallbackComments = [
      { id: 99, postId: 1, userId: 40, text: "Fallback Comment" },
    ];

    const usersMap = new Map([
      [10, { id: 10, name: "Author User" }],
      [40, { id: 40, name: "Fallback User" }],
    ]);

    mockPostsService.getPost.mockResolvedValue(post);
    // first call returns empty array, second call returns fallback comments
    mockCommentsService.getComments
      .mockResolvedValueOnce([])    // no comments on first call
      .mockResolvedValueOnce(fallbackComments); // fallback on second call

    mockUsersService.getUsers.mockResolvedValue(usersMap);

    const result = await interactor.execute(postId);

    expect(mockPostsService.getPost).toHaveBeenCalledWith(postId);
    expect(mockCommentsService.getComments).toHaveBeenCalledTimes(2);
    expect(mockCommentsService.getComments).toHaveBeenNthCalledWith(1, postId);
    expect(mockCommentsService.getComments).toHaveBeenNthCalledWith(2, 1);

    expect(mockUsersService.getUsers).toHaveBeenCalledWith([10, 40]);

    expect(result).toEqual({
      id: postId,
      authorId: 10,
      title: "Test Post",
      author: { id: 10, name: "Author User" },
      comments: [
        { id: 99, postId: 1, text: "Fallback Comment", user: { id: 40, name: "Fallback User" }, userId: undefined },
      ],
    });
  });

  it("should throw error on failure", async () => {
    const postId = 1;
    const errorMessage = "Service failure";

    mockPostsService.getPost.mockRejectedValue(new Error(errorMessage));
    mockCommentsService.getComments.mockResolvedValue([]);
    mockUsersService.getUsers.mockResolvedValue(new Map());

    await expect(interactor.execute(postId)).rejects.toThrow("Fail to fetch post");

    expect(mockPostsService.getPost).toHaveBeenCalledWith(postId);
  });
});
