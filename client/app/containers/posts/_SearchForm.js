import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import Button from 'components/Button';

class SearchForm extends Component {
  static propTypes = {
    initialKeywords: PropTypes.string,
    loading: PropTypes.bool,
    router: PropTypes.object
  }

  static defaultProps = {
    initialKeywords: '',
    loading: false
  }

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    this.setState({ keywords: this.props.initialKeywords });
  }

  onInputChange(event) {
    this.setState({ keywords: event.target.value });
  }

  onSearch(event) {
    event.preventDefault();
    const { keywords } = this.state;
    const pathName = (keywords) ? `/posts/search/${keywords}` : '/';
    this.props.router.push(pathName);
  }

  render() {
    const { loading } = this.props;

    return (
      <div className="search-form">
        <form onSubmit={this.onSearch} className="form-inline" role="search">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.keywords}
              onChange={this.onInputChange}
            />
          </div>
          <Button loading={loading} value="Search" />
        </form>
      </div>
    );
  }
}

export default withRouter(SearchForm);
