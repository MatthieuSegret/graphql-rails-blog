import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import withMutationState from 'apollo-mutation-state';

import PostForm from 'containers/posts/_PostForm';
import withFlashMessage from 'components/flash/withFlashMessage';

import POST_FOR_EDITING from 'graphql/posts/postForEditingQuery.graphql';
import UPDATE_POST from 'graphql/posts/updatePostMutation.graphql';

// typings
import { ApolloQueryResult } from 'apollo-client/core/types';
import {
  FlashMessageVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
  PostForEditingQuery,
  PostFragment,
  MutationState,
  MutationStateProps
} from 'types';

interface IProps {
  redirect: (path: string, message: FlashMessageVariables) => void;
  updatePost: ({  }: UpdatePostMutationVariables) => Promise<ApolloQueryResult<UpdatePostMutation>>;
  data: PostForEditingQuery;
  mutation: MutationState;
}

class EditPost extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.action = this.action.bind(this);
  }

  private async action(values: any) {
    return new Promise(async (_, reject) => {
      const { data: { updatePost: { errors } } } = await this.props.updatePost(values);
      if (!errors) {
        this.props.redirect('/', { notice: 'Post was successfully updated' });
      } else {
        reject(errors);
      }
    });
  }

  public render() {
    const { data: { post } } = this.props;
    if (!post) {
      return null;
    }

    return (
      <div>
        <h1 className="title">Editing post</h1>
        <PostForm
          action={this.action}
          initialValues={{ ...post }}
          submitName="Update Post"
          mutation={this.props.mutation}
        />
      </div>
    );
  }
}

const withPostForEditing = graphql(POST_FOR_EDITING, {
  options: (ownProps: any) => ({
    variables: {
      id: ownProps.match.params.id
    },
    fetchPolicy: 'network-only'
  })
});

const withUpdatePost = graphql<UpdatePostMutation, UpdatePostMutationVariables & MutationStateProps>(UPDATE_POST, {
  props: ({ mutate, ownProps: { wrapMutate } }) => ({
    updatePost(post: PostFragment) {
      return wrapMutate(mutate!({ variables: { ...post } }));
    }
  })
});

export default compose(
  withPostForEditing,
  withMutationState({ wrapper: true, propagateError: true }),
  withUpdatePost,
  withFlashMessage
)(EditPost);
