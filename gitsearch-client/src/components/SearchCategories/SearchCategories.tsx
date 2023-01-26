import { useContext } from "react";
import { AppContext, AppDispatch } from "../../context/context";

export default function SearchCategories() {
const { categories } = useContext(AppContext);
const { dispatchCategory } = useContext(AppDispatch);
  return (
    <div>
      <label htmlFor="inAll">All</label>
      <input id="inAll" type="checkbox" onChange={() => dispatchCategory("all")} checked={categories.has("all")} />
      <label htmlFor="inName">Name</label>
      <input id="inName" type="checkbox" onChange={() => dispatchCategory("name")} checked={categories.has("name")} />
      <label htmlFor="inDescription">Description</label>
      <input id="inDescription" type="checkbox" onChange={() => dispatchCategory("description")} checked={categories.has("description")} />
      <label htmlFor="inTopics">Topics</label>
      <input id="inTopics" type="checkbox" onChange={() => dispatchCategory("topics")} checked={categories.has("topics")} />
      <label htmlFor="inReadme">Readme</label>
      <input id="inReadme" type="checkbox" onChange={() => dispatchCategory("readme")} checked={categories.has("readme")} />
    </div>
  );
}
