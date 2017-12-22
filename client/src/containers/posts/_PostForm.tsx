import * as React from 'react';
import { Form, Field } from 'react-final-form';

import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import { required } from 'components/form/validation';

// typings
import { PostForEditingFragment, MutationState } from 'types';

interface IProps {
  handleSubmit?: (event: any) => void;
  action: (values: any) => Promise<any>;
  submitName: string;
  initialValues?: PostForEditingFragment;
  mutation: MutationState;
}

export default class PostForm extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  private async submitForm(values: any) {
    try {
      await this.props.action(values);
    } catch (errors) {
      return errors;
    }
  }

  public render() {
    const { submitName, initialValues: post, mutation: { loading } } = this.props;

    return (
      <Form
        onSubmit={this.submitForm}
        initialValues={post}
        render={({ handleSubmit }: any) => (
          <form onSubmit={handleSubmit} className="post-form">
            <Field name="title" component={RenderField} validate={required} />
            <Field name="content" type="textarea" inputHtml={{ rows: 8 }} component={RenderField} validate={required} />
            <SubmitField loading={loading} value={submitName} />
          </form>
        )}
      />
    );
  }
}
