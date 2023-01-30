import { useEffect } from "react";
import { faArrowDownWideShort, faArrowUpShortWide} from "@fortawesome/free-solid-svg-icons";
import classes from "./Filter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <select id="sort-dropdown" className={classes.dropdown} value={sortBy} disabled={isSearching} onChange={(e) => setSortBy(e.currentTarget.value)}>
        <option value="">Best Match</option>
        {sortOptions.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button disabled={isSearching} className={classes.filterButton} onClick={invertOrder}>
        <FontAwesomeIcon icon={orderBy === "asc" ? faArrowUpShortWide : faArrowDownWideShort}/>
      </button>
    </div>
  );
}
