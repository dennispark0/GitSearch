import React from 'react';
import classes from "./SearchBar.module.css";

export interface SearchBarProps {
  doSearch : () => void;
  query : string;
  setQuery : React.Dispatch<string>;
  isSearching : boolean;
}


export default function SearchBar({ doSearch, query, setQuery, isSearching } : SearchBarProps) {

  return (
    <div>
      <div className={classes.searchBar}>
        <input
          disabled={isSearching}
          className={classes.searchText}
          id="search-input"
          type="text"
          autoComplete="off"

          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          placeholder="I'm looking for..."
        />
        <button className={classes.searchButton} disabled={isSearching || !query} onClick={doSearch} type="button" id="search-button">
          Search
        </button>
      </div>
    </div>
  );
}
