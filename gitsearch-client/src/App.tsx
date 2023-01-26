import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { Search } from "./components/Search/Search";
import { RepositoryResult, RepositoryResultProps } from "./components/RepositoryResult/RepositoryResult";
import { AppContext, AppDispatch } from "./context/context";
import { Pagination } from "./components/Pagination";
import searchService from "./services/search.service";
import { SearchRepositoryRequest } from "./models/search-request.model";
import Filter from "./components/Filter/Filter";
import { categoryReducer, initialCategories } from "./constants/search-constants";

function App() {
  //TODO: combine these into a reducer or something-- getting kinda nutty UwU
  const [results, setResults] = useState<RepositoryResultProps[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("desc");
  const [isSearching, setIsSearching] = useState(false);
  const [categories, dispatchCategory] = useReducer(categoryReducer, initialCategories);

  const doSearch = async () => {
    setIsSearching(true);
    const _query : SearchRepositoryRequest = {
      q: query,
      sort : sortBy,
      order : orderBy,
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

  useEffect(()=> {
    if(!isSearching && query) {
      doSearch();
    }
    return () => {};
  }, [page, query, sortBy, orderBy])

  return (
    <AppContext.Provider value={{ page, query, isSearching, sortBy, orderBy, categories}}>
      <AppDispatch.Provider value={{ setPage, setQuery, setIsSearching, setSortBy, setOrderBy, dispatchCategory }}>
        <div className="App">
          <Search />
          <Filter />
          <main className="result-container">
            {results.map((result, i) => (<RepositoryResult key={i} {...result} />))}
          </main>
          <Pagination />
        </div>
      </AppDispatch.Provider>
    </AppContext.Provider>
  );
}

export default App;
