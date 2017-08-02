export default {
  getPost(state = [], { mutationResult, queryVariables }) {
    const { createComment } = mutationResult.data;

    if (createComment) {
      const newComment = createComment.newComment;
      if (!newComment) {
        return null;
      }
      return {
        post: {
          ...state.post,
          comments: [newComment, ...state.post.comments]
        }
      };
    }

    return state;
  }
};
