import React from "react";
import PropTypes from "prop-types";

const filterInput = (str) => {
  const regex = /[A-Za-z0-9_]/;
  return str
    .split("")
    .filter((x) => regex.test(x))
    .join("");
};

function SearchBar(props) {
  return (
    <input
      className={props.className}
      type="text"
      id="search"
      data-testid="search"
      placeholder="Search..."
      onChange={(event) => props.handleSearch(filterInput(event.target.value))}
    />
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
  className: PropTypes.string,
};

export default SearchBar;