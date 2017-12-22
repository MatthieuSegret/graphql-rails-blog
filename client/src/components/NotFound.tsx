import * as React from 'react';

export default class NotFound extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="content">
        <h2 className="title is-2 has-text-centered">404 page not found</h2>
        <p className="has-text-centered">We are sorry but the page you are looking for does not exist.</p>
      </div>
    );
  }
}
