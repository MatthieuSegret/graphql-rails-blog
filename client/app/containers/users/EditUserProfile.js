import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import gql from 'graphql-tag';

import withUserForEditing from 'queries/users/userForEditingQuery';
import withUpdateUser from 'mutations/users/updateUserMutation';
import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import Loading from 'components/Loading';

class EditUserProfile extends Component {
  static propTypes = {
    data: PropTypes.object,
    updateUser: PropTypes.func,
    handleSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
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

  render() {
    const { data: { loading: getUserloading } } = this.props;
    if (getUserloading) { return <Loading />; }
    const { loading } = this.state;

    return (
      <div className="edit-user">
        <h1>Edit user</h1>
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <Field name="name" component={RenderField} type="text" />
          <Field name="email" component={RenderField} type="text" />
          <Button loading={loading} value="Update" />
        </form>
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
  })(EditUserProfile))
));
