import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import gql from 'graphql-tag';

import withFlashMessage from 'components/withFlashMessage';
import withUserForEditing from 'queries/users/userForEditingQuery';
import withCancelAccount from 'mutations/users/cancelAccountMutation';
import withUpdateUser from 'mutations/users/updateUserMutation';
import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';

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
    return this.props.updateUser(values).then(errors => {
      if (errors) {
        this.setState({ loading: false });
        throw new SubmissionError(errors);
      }
    });
  }

  onCancelAccount() {
    if (window.confirm('Are you sure ?')) {
      return this.props.cancelAccount().then(response => {
        if (!response.errors) {
          window.localStorage.removeItem('blog:token');
          window.location = '/';
        }
      });
    }
    return false;
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="edit-user-profile">
        <h1>Edit profile</h1>
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <Field name="name" component={RenderField} type="text" />
          <Field name="email" component={RenderField} type="text" />
          <Button loading={loading} value="Update" />
        </form>
        <div className="change-password">
          <h3>Password</h3>
          <Link to="/users/password/edit" className="change-password-link">
            <i className="glyphicon glyphicon-pencil" />
            Change password
          </Link>
        </div>
        <div className="cancel-account">
          <h3>Cancel my account</h3>
          Unhappy?
          <button onClick={this.onCancelAccount} className="btn btn-default btn-xs cancel-account-link">
            Cancel my account
          </button>
        </div>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export const fragments = {
  user: gql`
    fragment UserForEditingFragment on User {
      id
      name
      email
    }
  `
};

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
