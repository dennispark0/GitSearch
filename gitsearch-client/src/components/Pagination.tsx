import { useContext } from "react";
import { AppContext, AppDispatch } from "../context/context";
import { SearchRepositoryRequest } from "../models/search-request.model";
import searchService from "../services/search.service";

export function Pagination() {
  const { page, query } = useContext(AppContext);
  const { setPage } = useContext(AppDispatch);

  const searchPage = async (_page : number) => {
    setPage(_page);
    const queryParams : SearchRepositoryRequest = {
      q: query,
      page: _page
    };
    const { data } = await searchService.getRepositories(queryParams);
  }
  
  return (
    <div>
      <button onClick={()=>searchPage(page - 1)}>Prev</button>
      <span>{page}</span>
      <button onClick={()=>searchPage(page + 1)}>Next</button>
    </div>
  );
}
