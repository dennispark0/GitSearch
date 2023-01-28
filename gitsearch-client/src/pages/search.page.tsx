import { useContext, useEffect } from "react";
import Filter from "../components/Filter/Filter";
import { Pagination } from "../components/Pagination";
import { RepositoryResult } from "../components/RepositoryResult/RepositoryResult";
import { Search } from "../components/Search/Search";
import { AppContext, AppDispatch } from "../context/context";
import { SearchRepositoryRequest } from "../models/search-request.model";
import searchService from "../services/search.service";

export default function SearchPage() {
    const { query, sortBy, orderBy, page, results, isSearching } = useContext(AppContext);
    const { setIsSearching, setResults } =  useContext(AppDispatch);
    const doSearch = async () => {
        setIsSearching(true);
        const _query: SearchRepositoryRequest = {
          q: query,
          sort: sortBy,
          order: orderBy,
          page
        };
        try {
          const { data } = await searchService.getRepositories(_query);
          if (data && data.items) {
            setResults(data.items);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      };
    
      useEffect(() => {
        if (!isSearching && query) {
          doSearch();
        }
        return () => { };
      }, [page, query, sortBy, orderBy]);


    return (
        <main>
            <Search />
            <Filter />
            <div className="result-container">
                {results.map((result, i) => (<RepositoryResult key={i} {...result} />))}
            </div>
            <Pagination />
        </main>
    )
}