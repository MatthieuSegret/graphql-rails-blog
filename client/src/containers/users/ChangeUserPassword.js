import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import withFlashMessage from 'components/flash/withFlashMessage';
import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';

import CHANGE_USER_PASSWORD from 'graphql/users/changeUserPasswordMutation.graphql';

class ChangeUserPassword extends Component {
  static propTypes = {
    changePassword: PropTypes.func,
    change: PropTypes.func,
    handleSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    this.setState({ loading: true });
    return this.props.changePassword(values).then(response => {
      const errors = response.data.changePassword.errors;
      if (!errors) {
        this.props.redirect('/', { notice: 'User password was successfully updated' });
      } else {
        this.setState({ loading: false });
        throw new SubmissionError(errors);
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="change-user-password">
        <div className="columns">
          <div className="column is-offset-one-quarter is-half">
            <h1 className="title is-3">Change password</h1>
            <form onSubmit={handleSubmit(this.submitForm)}>
              <Field name="currentPassword" label="Current password" type="password" component={RenderField} />
              <Field name="password" label="New password" type="password" component={RenderField} />
              <Field
                name="passwordConfirmation"
                label="Confirm your password"
                type="password"
                component={RenderField}
              />
              <SubmitField loading={loading} disabled={pristine || submitting} value="Update" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const withChangeUserPassword = graphql(CHANGE_USER_PASSWORD, {
  props: ({ mutate }) => ({
    changePassword(user) {
      return mutate({ variables: { ...user } });
    }
  })
});

export default reduxForm({
  form: 'ChangeUserPasswordForm'
})(withFlashMessage(withChangeUserPassword(ChangeUserPassword)));
