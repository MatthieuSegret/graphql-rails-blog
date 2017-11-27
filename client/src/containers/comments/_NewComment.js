import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
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
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
    deleteFlashMessage: PropTypes.func,
    currentUser: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    const { createComment, postId, reset } = this.props;
    this.setState({ loading: true });
    return createComment(postId, values).then(response => {
      const errors = response.data.createComment.errors;
      console.log(errors);
      if (!errors) {
        this.props.deleteFlashMessage();
        this.setState({ loading: false });
        reset();
      } else {
        throw new SubmissionError(errors);
      }
    });
  }

  render() {
    const { handleSubmit, currentUser } = this.props;
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
        <form onSubmit={handleSubmit(this.submitForm)}>
          <Field name="content" component={RenderField} type="textarea" rows={2} label="New comment" />
          <SubmitField loading={loading} cancel={false} value="Comment" />
        </form>
      </div>
    );
  }
}

const withCreateComment = graphql(CREATE_COMMENT, {
  props: ({ ownProps, mutate }) => ({
    createComment(postId, comment) {
      return mutate({
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
      });
    }
  })
});

export default reduxForm({
  form: 'CommentForm'
})(withCurrentUser(withCreateComment(withFlashMessage(NewComment))));
