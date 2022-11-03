import { Component } from 'react';
import { Notify } from 'notiflix';
import { ButtonTypes } from 'components/Button/ButtonTypes';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    search: '',
    prevSearchQuery: '',
  };

  handleSearchInput = e => {
    this.setState({ search: e.target.value });
  };

  onSubmite = e => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.search.value;

    if (!searchQuery) {
      Notify.warning('Please enter your query in the search box');
      return;
    }

    if (this.state.prevSearchQuery === searchQuery) {
      Notify.info('We already found it');
      return;
    }

    this.setState({ prevSearchQuery: searchQuery });

    this.props.handleSubmite(searchQuery);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmite}>
          <Button {...ButtonTypes.search} disabled={this.props.isLoading} />
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            value={this.state.search}
            onChange={this.handleSearchInput}
          />
        </form>
      </header>
    );
  }
}
SearchBar.propTypes = {
  handleSubmite: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
