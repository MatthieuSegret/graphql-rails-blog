import * as React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router';

// typings
import { History } from 'history';

interface IProps {
  initialKeywords: string;
  history: History;
}

interface IState {
  keywords: string;
}

class SearchForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  public componentWillMount() {
    this.setState({ keywords: this.props.initialKeywords });
  }

  private onInputChange(event: any) {
    this.setState({ keywords: event.target.value });
  }

  private onSearch(event: any) {
    event.preventDefault();
    const { keywords } = this.state;
    const pathName = keywords ? `/posts/search/${keywords}` : '/';
    this.props.history.push(pathName);
  }

  public render() {
    return (
      <form onSubmit={this.onSearch} role="search">
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              name="keywords"
              value={this.state.keywords}
              onChange={this.onInputChange}
            />
          </div>
          <div className="control">
            <input className="button" name="commit" type="submit" value="Search" />
          </div>
        </div>
      </form>
    );
  }
}

export default compose(withRouter)(SearchForm);
