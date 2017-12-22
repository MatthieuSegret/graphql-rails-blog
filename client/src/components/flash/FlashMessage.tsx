import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import classnames from 'classnames';

import withFlashMessage from 'components/flash/withFlashMessage';
import FLASH_MESSAGE from 'graphql/flash/flashMessageQuery.graphql';

// typings
import { FlashMessageQuery } from 'types';

interface IProps {
  data: FlashMessageQuery;
  deleteFlashMessage: () => void;
}

class FlashMessage extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  private onClick() {
    this.props.deleteFlashMessage();
  }

  public render() {
    const { message } = this.props.data;
    if (!message) {
      return null;
    }
    const { type, text } = message;

    return (
      <div
        className={classnames('notification', {
          'is-primary': type === 'notice',
          'is-danger': type === 'error'
        })}
      >
        <button onClick={this.onClick} className="delete" />
        {text}
      </div>
    );
  }
}

export default compose(graphql(FLASH_MESSAGE), withFlashMessage)(FlashMessage);
