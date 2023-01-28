import { useEffect } from "react";
import classes from "./Filter.module.css";
export interface FilterProps {
  sortBy: string;
  setSortBy: React.Dispatch<string>;
  orderBy: string;
  setOrderBy: React.Dispatch<string>;
  doSearch: () => void;
  isSearching: boolean;
}
export default function Filter({ sortBy, setSortBy, orderBy, setOrderBy, doSearch, isSearching }: FilterProps) {
  const sortOptions = ["stars", "forks", "help-wanted-issues", "updated"];
  const invertOrder = () => setOrderBy(orderBy === "asc" ? "desc" : "asc");

  useEffect(() => {
    doSearch();
    return () => {};
  }, [sortBy, orderBy]);

  return (
    <div className={classes.filterContainer}>
      <span>Sort By:</span>
      <select id="sort-dropdown" value={sortBy} disabled={isSearching} onChange={(e) => setSortBy(e.currentTarget.value)}>
        <option value="">Best Match</option>
        {sortOptions.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button disabled={isSearching} onClick={invertOrder}>
        {orderBy === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}
