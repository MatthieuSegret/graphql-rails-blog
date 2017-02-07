import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';

class EditUser extends Component {
  static propTypes = {
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

export default reduxForm({
  form: 'EditUserForm'
})(EditUser);
