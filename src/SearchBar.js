import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSearchBar = styled.div`
  /* margin-top: 50px; */
  /* height: 1000px; */
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

const StyledForm = styled.form`
  display: flex;
  position: fixed;
  top: 5vw;
  width: 80vw;
  height: 45px;
  margin: 10px 0px;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  font-size: 125%;
  box-sizing: border-box;
  width: 85%;
  border: 1px solid gray;
  border-radius: 5px 0px 0px 5px;
  outline: none;
`;

const StyledButton = styled.button`
  font-size: 125%
  /* width: 100px; */
  width: 15%;
  box-sizing: border-box;
  background-color: #20B2AA;
  border-radius: 0px 5px 5px 0;
  border: 1px solid gray;
  color: white;

  &:hover {
    background-color: #008080;
    cursor: pointer;
  }
`;

// Custom debouncer. Used to optimize real-time search
function debouncer(func, wait) {
  let timeOut;
  function debounced(...args) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => func(...args), wait);
  }
  function timeClear() {
    clearTimeout(timeOut);
  }
  return [debounced, timeClear];
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    const [search, timeClear] = debouncer(this.props.onSearch, 500);
    this.state = {
      search: ''
    };
    this.bouncedSearch = search;
    this.timeClear = timeClear;
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillUnmount() {
    this.timeClear();
  }

  handleSearch(event) {
    event.preventDefault();
    this.timeClear();
    this.props.onSearch(this.state.search);
  }

  handleChange(evt) {
    // runs on every keystroke
    this.setState({
      [evt.target.name]: evt.target.value
    });
    this.bouncedSearch(evt.target.value);
  }

  render() {
    return (
      <StyledSearchBar className="SearchBar">
        <StyledForm action="#" onSubmit={this.handleSearch}>
          <StyledInput
            type="text"
            name="search"
            placeholder="Enter search term..."
            value={this.state.search}
            onChange={this.handleChange}
          />
          <StyledButton>Search</StyledButton>
        </StyledForm>
      </StyledSearchBar>
    );
  }
}

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default SearchBar;
