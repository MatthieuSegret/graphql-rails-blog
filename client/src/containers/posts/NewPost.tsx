import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import withMutationState from 'apollo-mutation-state';

import PostForm from 'containers/posts/_PostForm';
import withFlashMessage from 'components/flash/withFlashMessage';

import CREATE_POST from 'graphql/posts/createPostsMutation.graphql';
import POSTS from 'graphql/posts/postsQuery.graphql';

// typings
import { ApolloQueryResult } from 'apollo-client/core/types';
import { DataProxy } from 'apollo-cache';
import {
  FlashMessageVariables,
  CreatePostMutation,
  CreatePostMutationVariables,
  PostsQuery,
  PostFragment,
  MutationState,
  MutationStateProps
} from 'types';

interface IProps {
  redirect: (path: string, message: FlashMessageVariables) => void;
  createPost: ({  }: CreatePostMutationVariables) => Promise<ApolloQueryResult<CreatePostMutation>>;
  mutation: MutationState;
}

class NewPost extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.action = this.action.bind(this);
  }

  private async action(values: any) {
    return new Promise(async (_, reject) => {
      const { data: { createPost: { errors } } } = await this.props.createPost(values);
      if (!errors) {
        this.props.redirect('/', { notice: 'Post was successfully created.' });
      } else {
        reject(errors);
      }
    });
  }

  public render() {
    return (
      <div>
        <h1 className="title">New Post</h1>
        <PostForm action={this.action} submitName="Create Post" mutation={this.props.mutation} />
      </div>
    );
  }
}

const withCreatePost = graphql<CreatePostMutation, CreatePostMutationVariables & MutationStateProps>(CREATE_POST, {
  props: ({ mutate, ownProps: { wrapMutate } }) => ({
    createPost(post: PostFragment) {
      return wrapMutate(
        mutate!({
          variables: { ...post },
          update: (store: DataProxy, { data: { createPost: { newPost } } }: any): void => {
            if (!newPost) return;
            const data = store.readQuery({ query: POSTS }) as PostsQuery;
            if (!data.posts) return;

            data.posts.unshift(newPost);
            data.postsCount += 1;
            store.writeQuery({ query: POSTS, data });
          }
        })
      );
    }
  })
});

export default compose(withMutationState({ wrapper: true, propagateError: true }), withCreatePost, withFlashMessage)(
  NewPost
);
