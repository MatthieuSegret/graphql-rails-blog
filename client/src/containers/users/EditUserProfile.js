import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { graphql } from 'react-apollo';

import withFlashMessage from 'components/flash/withFlashMessage';
import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';

import USER_FOR_EDITING from 'graphql/users/userForEditingQuery.graphql';
import UPDATE_USER from 'graphql/users/updateUserMutation.graphql';
import CANCEL_ACCOUNT from 'graphql/users/cancelAccountMutation.graphql';

class EditUserProfile extends Component {
  static propTypes = {
    redirect: PropTypes.func,
    cancelAccount: PropTypes.func,
    updateUser: PropTypes.func,
    handleSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
    this.onCancelAccount = this.onCancelAccount.bind(this);
  }

  submitForm(values) {
    this.setState({ loading: true });
    return this.props.updateUser(values).then(response => {
      const errors = response.data.updateUser.errors;
      if (!errors) {
        this.props.redirect('/', { notice: 'User was successfully updated' });
      } else {
        this.setState({ loading: false });
        throw new SubmissionError(errors);
      }
    });
  }

  onCancelAccount() {
    if (window.confirm('Are you sure ?')) {
      return this.props.cancelAccount().then(response => {
        if (!response.data.cancelAccount.errors) {
          window.localStorage.removeItem('blog:token');
          window.location = '/';
        }
      });
    }
  }

  render() {
    const { loading } = this.state;
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="edit-user-profile">
        <div className="columns">
          <div className="column is-offset-one-quarter is-half">
            <h1 className="title is-2">Edit profile</h1>
            <form onSubmit={handleSubmit(this.submitForm)}>
              <Field name="name" component={RenderField} />
              <Field name="email" component={RenderField} />
              <SubmitField loading={loading} disabled={pristine || submitting} value="Update" />
            </form>

            <div className="change-password">
              <h3 className="title is-4">Password</h3>
              <Link to="/users/password/edit" className="change-password-link">
                <span className="icon">
                  <i className="fa fa-pencil" />
                </span>
                Change password
              </Link>
            </div>

            <div className="cancel-account">
              <h3 className="title is-4">Cancel my account</h3>
              <a onClick={this.onCancelAccount}>
                <span className="icon">
                  <i className="fa fa-trash-o" />
                </span>
                Cancel my account
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "can't be blank";
  }
  if (!values.email) {
    errors.email = "can't be blank";
  }
  return errors;
}

const withUserForEditing = graphql(USER_FOR_EDITING, {
  options: ownProps => ({
    fetchPolicy: 'network-only'
  })
});

const withUpdateUser = graphql(UPDATE_USER, {
  props: ({ mutate }) => ({
    updateUser(user) {
      return mutate({ variables: { ...user } });
    }
  })
});

const withCancelAccount = graphql(CANCEL_ACCOUNT, {
  props: ({ mutate }) => ({
    cancelAccount(user) {
      return mutate();
    }
  })
});

EditUserProfile = withUpdateUser(
  withFlashMessage(
    withCancelAccount(
      reduxForm({
        form: 'EditUserProfileForm',
        validate
      })(EditUserProfile)
    )
  )
);

EditUserProfile = compose(
  withUserForEditing,
  connect((state, props) => {
    const user = props.data.currentUser;
    return {
      initialValues: { name: user.name, email: user.email }
    };
  })
)(EditUserProfile);

export default EditUserProfile;
