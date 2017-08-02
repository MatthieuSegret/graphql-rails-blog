export default {
  currentUser(state = [], { mutationResult, queryVariables }) {
    const { signUp } = mutationResult.data;

    if (signUp) {
      const currentUser = signUp.currentUser;
      if (!currentUser) {
        return null;
      }
      return { currentUser };
    }

    return state;
  }
};
