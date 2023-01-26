import React, { useContext, useReducer, useState } from "react";
import { AppContext, AppDispatch } from "../../context/context";
import classes from "./Search.module.css";

export function Search() {
  const { isSearching, categories } = useContext(AppContext);
  const { setQuery } = useContext(AppDispatch);
  const [q, setQ] = useState("");


  //the "category" property of a query needs to be in a format of "in:a,b,c.."
  const categoryQualifiers = () => {
    //simply omit the qualifier to search all dimensions.
    if (categories.has("all")) {
      return "";
    }
    return Array.from(categories).reduce((str, category, i) => {
      if (i <= 0) {
        return `${str}${category}`;
      }
      return `${str},${category}`;
    }, "in:");
  };

  const submitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setQuery(`${q} ${categoryQualifiers()}`);
    }
  };

  return (
    <div>
      <div className={classes.searchBar}>
        <input
          className={classes.searchText}
          id="search-input"
          type="text"
          autoComplete="off"
          onKeyDown={submitOnEnter}
          value={q}
          onChange={(e) => setQ(e.currentTarget.value)}
          placeholder="I'm looking for..."
        />
        <button className={classes.searchButton} disabled={isSearching || !q} onClick={()=>setQuery(`${q} ${categoryQualifiers()}`)} type="button" id="search-button">
          Search
        </button>
      </div>
    </div>
  );
}
