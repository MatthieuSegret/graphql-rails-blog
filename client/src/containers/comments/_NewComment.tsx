import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import withMutationState from 'apollo-mutation-state';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import shortid from 'shortid';

import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import withCurrentUser from 'queries/currentUserQuery';
import withFlashMessage from 'components/flash/withFlashMessage';

import CREATE_COMMENT from 'graphql/posts/createCommentMutation.graphql';
import POST from 'graphql/posts/postQuery.graphql';

// typings
import { ApolloQueryResult } from 'apollo-client/core/types';
import { DataProxy } from 'apollo-cache';
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  PostQuery,
  User,
  MutationState,
  MutationStateProps
} from 'types';

interface IProps {
  postId: string;
  createComment: (
    postId: string,
    { content }: CreateCommentMutationVariables
  ) => Promise<ApolloQueryResult<CreateCommentMutation>>;
  handleSubmit: (event: any) => void;
  deleteFlashMessage: () => void;
  currentUser: User;
  mutation: MutationState;
}

class NewComment extends React.Component<IProps, {}> {
  private createCommentForm: any;

  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  public async submitForm(values: any) {
    const { createComment, postId } = this.props;
    const { data: { createComment: { errors } } } = await createComment(postId, values);
    if (!errors) {
      this.props.deleteFlashMessage();
      this.createCommentForm.form.change('content', '');
    } else {
      return errors;
    }
  }

  public render() {
    const { mutation: { loading }, currentUser } = this.props;

    if (!currentUser) {
      return (
        <p>
          You need to <Link to="/users/signin">sign in</Link> or <Link to="/users/signup">sign up</Link> before
          continuing.
        </p>
      );
    }

    return (
      <div className="new-comment">
        <Form
          onSubmit={this.submitForm}
          ref={(input: any) => {
            this.createCommentForm = input;
          }}
          render={({ handleSubmit, pristine }: any) => (
            <form onSubmit={handleSubmit}>
              <Field name="content" component={RenderField} type="textarea" rows={2} label="New comment" />
              <SubmitField loading={loading} cancel={false} disabled={pristine} value="Comment" />
            </form>
          )}
        />
      </div>
    );
  }
}

type CurrentUserProps = {
  currentUser: User;
};

const withCreateComment = graphql<
  CreateCommentMutation,
  CreateCommentMutationVariables & MutationStateProps & CurrentUserProps
>(CREATE_COMMENT, {
  props: ({ ownProps, mutate }) => ({
    createComment(postId: string, comment: CreateCommentMutationVariables) {
      return ownProps.wrapMutate(
        mutate!({
          variables: { postId, ...comment },
          update: (store: DataProxy, { data: { createComment: { newComment } } }: any): void => {
            if (!newComment) return;
            const id = ownProps.postId;
            const data = store.readQuery({ query: POST, variables: { id } }) as PostQuery;
            if (!data || !data.post) return;

            data.post.comments.unshift(newComment);
            store.writeQuery({ query: POST, variables: { id }, data });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createComment: {
              __typename: 'Post',
              newComment: {
                __typename: 'Comment',
                id: shortid.generate(),
                content: comment.content,
                created_at: +new Date(),
                pending: true,
                author: {
                  __typename: 'User',
                  name: ownProps.currentUser.name
                }
              },
              messages: null
            }
          }
        })
      );
    }
  })
});

export default compose(
  withCurrentUser,
  withMutationState({ wrapper: true, propagateError: true }),
  withCreateComment,
  withFlashMessage
)(NewComment);
