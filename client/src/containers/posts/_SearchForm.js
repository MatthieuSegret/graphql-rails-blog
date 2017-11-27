import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class SearchForm extends Component {
  static propTypes = {
    initialKeywords: PropTypes.string,
    history: PropTypes.object
  };

  static defaultProps = {
    initialKeywords: ''
  };

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
    const pathName = keywords ? `/posts/search/${keywords}` : '/';
    this.props.history.push(pathName);
  }

  render() {
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

export default withRouter(SearchForm);
