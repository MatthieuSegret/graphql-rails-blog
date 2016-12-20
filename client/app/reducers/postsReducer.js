export default {
  posts(state = [], { mutationResult, queryVariables }) {
    const { createPost, destroyPost } = mutationResult.data;

    if (createPost) {
      const newPost = createPost.newPost;
      if (!newPost) { return null; }
      return {
        posts: [newPost, ...state.posts],
        postsCount: state.postsCount + 1
      };
    }

    if (destroyPost) {
      const postDestroyed = destroyPost.post;
      if (!postDestroyed) { return null; }
      return {
        posts: state.posts.filter(post => post.id !== postDestroyed.id),
        postsCount: state.postsCount - 1
      };
    }

    return state;
  }
};

export function updateQuery(state, { fetchMoreResult }) {
  const { posts, postsCount } = fetchMoreResult.data;
  return {
    posts: [...state.posts, ...posts],
    postsCount
  };
}
