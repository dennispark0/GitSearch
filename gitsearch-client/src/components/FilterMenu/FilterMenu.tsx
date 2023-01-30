import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { PropsWithChildren, useState } from "react";
import { ExtraFilterLabel, ExtraFilters, extraFilters } from "../../constants/search-constants";
import classes from "./FilterMenu.module.css";

export interface FilterMenuProps {
  filters: ExtraFilters;
  dispatchFilter: React.Dispatch<{ key: ExtraFilterLabel; value: string }>;
}

export default function FilterMenu({ filters, dispatchFilter, children }: PropsWithChildren<FilterMenuProps>) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <nav className={`${classes.filterMenuContainer} ${isOpen ? classes.open : ''}`}>
      <button onClick={()=>setIsOpen(!isOpen)}><FontAwesomeIcon icon={faBars}/></button>
      {children}
      <hr />
      <h2>Additional Filters</h2>
      {Object.keys(filters).map(filterName=>      
        (<span className={classes.filterInput}>
        <label htmlFor={`${filterName}-filter`}>{filterName}:</label>
        <input id={filterName} value={filters[filterName]} 
          onChange={(e)=> dispatchFilter({ key: filterName as ExtraFilterLabel, value : e.currentTarget.value})}/>
      </span>))
      }
    </nav>
  );
}
