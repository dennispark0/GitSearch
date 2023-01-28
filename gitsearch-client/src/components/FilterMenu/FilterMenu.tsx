import React, { PropsWithChildren, useEffect, useState, useReducer } from "react";
import { extraFilters } from "../../constants/search-constants";
import classes from "./FilterMenu.module.css";


export interface FilterMenuProps {
  constraints : string[];
  setConstraints : React.Dispatch<string[]>;
}
const updateArray = (input: string[], value: string, i: number, callback : React.Dispatch<string[]>) => {
  const temp = [...input];
  temp[i] = value;
  callback(temp);
};
export default function FilterMenu({ constraints, setConstraints, children }: PropsWithChildren<FilterMenuProps>) {
  const [filters, setFilters] = useState(extraFilters);

  const addConstraintFromFilter = () => {

  }

  return (
    <nav className={classes.filterMenuContainer}>
      {children}
      <h2>Filter By:</h2>
      <select onChange={addConstraintFromFilter}>
        <option>- Select -</option>
        {filters.filter(f=>f).map((filter, i)=> <option key={`constraint-${filter}-${i}`} value={i}>{filter}</option>)}
      </select>
      {constraints.filter(c=>c).map((constraint, i)=><div key={`constraint-${constraint}-${i}`}>
        <label>{constraint}</label>
        {/* <input value={values[i]} onChange={(e)=>updateArray(values,e.currentTarget.value, i, setValues)}/> */}
      </div>)}
    </nav>
  );
}

