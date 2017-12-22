export type FlashMessageVariables = {
  notice?: string | null;
  error?: string | null;
};

export type FlashMessage = {
  type: string;
  text: string;
};

export type FlashMessageQuery = {
  message: FlashMessage;
};

export type MutationState = {
  loading: boolean;
  error: any;
  success: boolean;
};

export type MutationStateProps = {
  wrapMutate: (promise: Promise<any>) => Promise<any>;
};

export type RevokeTokenMutation = {
  revokeToken: {
    errors: any;
  };
};

export type SignInMutationVariables = {
  email: string;
  password: string;
};

export type SignInMutation = {
  signIn: {
    __typename: 'signInPayload';
    token?: string;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type CreateCommentMutationVariables = {
  postId: string;
  content: string;
};

export type CreateCommentMutation = {
  createComment: {
    __typename: 'CommentPayload';
    newComment: CommentFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type CreatePostMutationVariables = {
  title: string;
  content: string;
};

export type CreatePostMutation = {
  createPost: {
    __typename: 'PostPayload';
    newPost: PostForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type DeletePostMutationVariables = {
  id: string;
};

export type DeletePostMutation = {
  deletePost: {
    __typename: 'PostPayload';
    post: {
      __typename: 'Post';
      id: string;
    };
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type PostForEditingQueryVariables = {
  id: string;
};

export type PostForEditingQuery = {
  post: PostForEditingFragment | null;
};

export type PostQueryVariables = {
  id: string;
};

export type PostQuery = {
  post: PostFragment | null;
};

export type PostsQueryVariables = {
  offset?: number | null;
  keywords?: string | null;
};

export type PostsQuery = {
  postsCount: number;
  posts: Array<PostPreviewFragment> | null;
};

export type UpdatePostMutationVariables = {
  id: string;
  title?: string | null;
  content?: string | null;
};

export type UpdatePostMutation = {
  updatePost: {
    __typename: 'PostPayload';
    post: PostForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type CancelAccountMutation = {
  cancelAccount: {
    errors: any;
  };
};

export type ChangePasswordMutationVariables = {
  password: string;
  passwordConfirmation: string;
  currentPassword: string;
};

export type ChangePasswordMutation = {
  changePassword: {
    __typename: 'UserPayload';
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type CurrentUserQuery = {
  currentUser: User | null;
};

export type SignUpMutationVariables = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type SignUpMutation = {
  signUp: {
    __typename: 'UserPayload';
    currentUser: {
      __typename: 'User';
      id: string;
      name: string;
      email: string;
      token: string;
    } | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type UpdateUserMutationVariables = {
  name?: string | null;
  email?: string | null;
};

export type UpdateUserMutation = {
  updateUser: {
    __typename: 'UserPayload';
    user: UserForEditingFragment | null;
    errors: any;
    messages: Array<ValidationMessage> | null;
  };
};

export type GetUserForEditingQuery = {
  // Fetch the current user
  currentUser: UserForEditingFragment | null;
};

export type CommentFragment = {
  __typename: 'Comment';
  id: string;
  content: string;
  created_at: string;
  author: {
    __typename: string;
    name: string;
  };
};

export type PostForEditingFragment = {
  __typename: 'Post';
  id: string;
  title: string;
  content: string;
  description: string;
};

export type PostFragment = {
  __typename: 'Post';
  id: string;
  title: string;
  content: string;
  description: string;
  created_at: string;
  author: {
    __typename: string;
    id: string;
    name: string;
  };
  comments: Array<CommentFragment>;
};

export type PostPreviewFragment = {
  __typename: 'Post';
  id: string;
  title: string;
  description: string;
  created_at: string;
  author: {
    __typename: string;
    id: string;
    name: string;
  };
};

export type UserForEditingFragment = {
  __typename: 'User';
  id: string;
  name: string;
  email: string;
};

export type ValidationMessage = {
  __typename: 'ValidationMessage';
  field: string;
  message: string;
};

export type User = {
  __typename: 'User';
  id: string;
  name: string;
  email: string;
};
