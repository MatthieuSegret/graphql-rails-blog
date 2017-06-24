import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import axios from 'config/axios';
import withUserForEditing from 'queries/users/userForEditingQuery';
import withUpdateUser from 'mutations/users/updateUserMutation';
import withFlashMessage from 'components/withFlashMessage';
import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import Loading from 'components/Loading';

class EditUserProfile extends Component {
  static propTypes = {
    data: PropTypes.object,
    client: PropTypes.object,
    redirect: PropTypes.func,
    error: PropTypes.func,
    updateUser: PropTypes.func,
    handleSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
    this.cancelAccount = this.cancelAccount.bind(this);
  }

  submitForm(values) {
    this.setState({ loading: true });
    return this.props.updateUser(values).then((errors) => {
      if (errors) {
        this.setState({ loading: false });
        throw new SubmissionError(errors);
      }
    });
  }

  cancelAccount() {
    if (window.confirm('Are you sure ?')) {
      return axios.delete('/users').then((response) => {
        if (response.status !== 204) {
          this.props.error("Oops, we're sorry, but something went wrong");
        } else {
          this.props.client.resetStore();
          this.props.redirect('/', { notice: 'Bye! Your account has been successfully cancelled. We hope to see you again soon.' });
        }
      });
    }
    return false;
  }

  render() {
    const { data: { loading: getUserloading } } = this.props;
    if (getUserloading) { return <Loading />; }
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
          <button onClick={this.cancelAccount} className="btn btn-default btn-xs cancel-account-link">Cancel my account</button>
        </div>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export const fragments = {
  user: gql`
    fragment UserForEditingFragment on User {
      id,
      name,
      email
    }
  `
};

function validate(values) {
  const errors = {};
  if (!values.name) { errors.name = "can't be blank"; }
  if (!values.email) { errors.email = "can't be blank"; }
  return errors;
}

export default withUserForEditing(withUpdateUser(
  connect(
    (state, props) => ({
      initialValues: props.currentUser
    })
  )(reduxForm({
    form: 'EditUserProfileForm',
    validate
  })(withFlashMessage(withApollo(EditUserProfile))))
));
