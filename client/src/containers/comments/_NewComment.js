import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class NewComment extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    createComment: PropTypes.func,
    reset: PropTypes.func,
    deleteFlashMessage: PropTypes.func,
    currentUser: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(values) {
    const { createComment, postId } = this.props;
    const { data: { createComment: { errors } } } = await createComment(postId, values);
    if (!errors) {
      this.props.deleteFlashMessage();
      this.createCommentForm.form.change('content', '');
    } else {
      return errors;
    }
  }

  render() {
    const { currentUser } = this.props;
    const { loading } = this.state;

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
          ref={input => {
            this.createCommentForm = input;
          }}
          render={({ handleSubmit, pristine }) => (
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

const withCreateComment = graphql(CREATE_COMMENT, {
  props: ({ ownProps, mutate }) => ({
    createComment(postId, comment) {
      return ownProps.wrapMutate(
        mutate({
          variables: { postId, ...comment },
          update: (store, { data: { createComment: { newComment } } }) => {
            if (!newComment) return false;
            const id = ownProps.postId;
            const data = store.readQuery({ query: POST, variables: { id } });
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
