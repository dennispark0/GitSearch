import { useContext } from "react";
import { AppContext, AppDispatch } from "../../context/context";
import classes from "./Filter.module.css";

export default function Filter() {
  const { sortBy, orderBy, isSearching } = useContext(AppContext);
  const { setSortBy, setOrderBy } = useContext(AppDispatch);
  const sortOptions = ["stars", "forks", "help-wanted-issues", "updated"];
  const invertOrder = () => setOrderBy(orderBy === "asc" ? "desc" : "asc");
  return (
    <div className={classes.filterContainer}>
      <span>Sort By:</span>
      <select id="sort-dropdown" value={sortBy} onChange={(e) => setSortBy(e.currentTarget.value)}>
        <option value="">Best Match</option>
        {sortOptions.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button disabled={isSearching} onClick={invertOrder}>{orderBy === "asc" ? "↑" : "↓"}</button>
    </div>
  );
}
