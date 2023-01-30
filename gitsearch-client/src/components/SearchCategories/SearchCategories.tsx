
import { Categories, Category } from "../../constants/search-constants";
import classes from "./SearchCategories.module.css";

export interface SearchCategoriesProps {
  categories: Categories;
  dispatchCategory: React.Dispatch<Category>;
}

export default function SearchCategories({ categories, dispatchCategory }: SearchCategoriesProps) {
  return (
    <div className={classes.searchCategoriesContainer}>
      <h2>Search in</h2>
      <span>
        <input id="inAll" type="checkbox" onChange={() => dispatchCategory("all")} checked={categories.has("all")} />
        <label htmlFor="inAll">All</label>
      </span>
      <span>
        <input id="inName" type="checkbox" onChange={() => dispatchCategory("name")} checked={categories.has("name")} />
        <label htmlFor="inName">Name</label>
      </span>
      <span>
        <input id="inDescription" type="checkbox" onChange={() => dispatchCategory("description")} checked={categories.has("description")} />
        <label htmlFor="inDescription">Description</label>
      </span>
      <span>
        <input id="inTopics" type="checkbox" onChange={() => dispatchCategory("topics")} checked={categories.has("topics")} />
        <label htmlFor="inTopics">Topics</label>
      </span>
      <span>
        <input id="inReadme" type="checkbox" onChange={() => dispatchCategory("readme")} checked={categories.has("readme")} />
        <label htmlFor="inReadme">Readme</label>
      </span>
    </div>
  );
}
