import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';

import withUserForEditing from 'queries/users/userForEditingQuery';
import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import Loading from 'components/Loading';

class EditUser extends Component {
  static propTypes = {
    data: PropTypes.object,
    handleSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    // TODO update user
  }

  render() {
    const { data: { loading } } = this.props;
    if (loading) { return <Loading />; }

    return (
      <div className="users-edit">
        <h1>Edit user</h1>
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <Field name="name" component={RenderField} type="text" />
          <Field name="email" component={RenderField} type="text" />
          <Button value="Update" />
        </form>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export const fragments = {
  user: gql`
    fragment UserForEditingFragment on User {
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

export default withUserForEditing(
  connect(
    (state, props) => ({
      initialValues: props.currentUser
    })
  )(reduxForm({
    form: 'EditUserForm',
    validate
  })(EditUser))
);
