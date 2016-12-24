import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError, change } from 'redux-form';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

import axios from 'config/axios';
import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import withFlashMessage from 'components/withFlashMessage';

class SignInUser extends Component {
  static propTypes = {
    redirect: PropTypes.func,
    client: PropTypes.object,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    error: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    return axios.post('/users/sign_in', { user: values }).then((response) => {
      if (response.status === 201) {
        this.props.client.resetStore();
        this.props.redirect('/', { notice: 'Signed in successfully.' });
      }
    }).catch((err) => {
      console.log(err);
      this.props.change('SignInForm', 'password', '');
      this.props.error('Invalid Email or password.');
      throw new SubmissionError();
    });
  }

  render() {
    return (
      <div className="users-signin">
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <Field name="email" component={RenderField} type="text" label="Email" />
          <Field name="password" component={RenderField} type="password" label="Password" />
          <Button value="Log in" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'SignInForm'
})(connect(null, { change })(withFlashMessage(withApollo(SignInUser))));
