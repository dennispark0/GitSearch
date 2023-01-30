import { useReducer, useState } from "react";
import Filter from "../../components/Filter/Filter";
import { SearchRepositoryRequest } from "../../models/search-request.model";
import searchService from "../../services/search.service";
import classes from "./search.module.css";
import { Categories, Category, ExtraFilterLabel, ExtraFilters, extraFilters, initialCategories } from "../../constants/search-constants";
import LoginButton from "../../components/LoginButton/LoginButton";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import { Pagination } from "../../components/Pagination/Pagination";
import { RepositoryResultProps, RepositoryResult } from "../../components/RepositoryResult/RepositoryResult";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchCategories from "../../components/SearchCategories/SearchCategories";
import { buildQualifierString } from "../../utils/util";

const categoryReducer = (state: Categories, action: Category) => {
  if (action === "all") {
    return state.has("all") ? new Set<Category>() : new Set(initialCategories);
  }
  const newState = new Set(state);
  //if any flag is toggled, we no longer need the 'all' flag
  newState.delete("all");
  if (!newState.delete(action)) {
    newState.add(action);
  }
  return newState;
};

const filterReducer = (state: ExtraFilters, action: { key: ExtraFilterLabel; value: string }) => {
  state[action.key] = action.value;
  return { ...state };
};

export default function SearchPage() {
  const [results, setResults] = useState<RepositoryResultProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("desc");
  const [isSearching, setIsSearching] = useState(false);
  const [categories, dispatchCategory] = useReducer(categoryReducer, initialCategories);
  const [filters, dispatchFilter] = useReducer(filterReducer, extraFilters);

  //the "category" property of a query needs to be in a format of "in:a,b,c.."
  //simply omit the qualifier to search all dimensions.
  const categoryQualifiers = () => (categories.has("all") ? "" : "in:" + Array.from(categories).join(","));

  const doSearch = async () => {
    if (isSearching || !query) {
      return;
    }
    setIsSearching(true);
    const _query: SearchRepositoryRequest = {
      q: encodeURIComponent(`${query} ${categoryQualifiers()} ${buildQualifierString(filters)}`),
      sort: sortBy,
      order: orderBy,
      page,
    };
    try {
      const { data } = await searchService.getRepositories(_query);
      const { items, total_count } = data;
      setResults(items);
      setTotalPages(Math.floor(total_count / 30));
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const submitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSearching) {
      doSearch();
    }
  };

  const Results = () =>
    results.length ? (
      <>
        {results.map((result, i) => (
          <RepositoryResult key={i} {...result} />
        ))}
      </>
    ) : (
      <span>No Results</span>
    );

  return (
    <main className={classes.searchContainer} onKeyDown={submitOnEnter}>
      <FilterMenu filters={filters} dispatchFilter={dispatchFilter}>
        <LoginButton />
        <hr />
        <SearchCategories categories={categories} dispatchCategory={dispatchCategory} />
      </FilterMenu>
      <section className={classes.mainSearchMenu}>
        <SearchBar isSearching={isSearching} query={query} setQuery={setQuery} doSearch={doSearch} />
        <div>
          <Filter doSearch={doSearch} isSearching={isSearching} sortBy={sortBy} setSortBy={setSortBy} orderBy={orderBy} setOrderBy={setOrderBy} />
          {<div className={classes.resultContainer}>{!isSearching ? <Results /> : "Searching..."}</div>}
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} isSearching={isSearching} doSearch={doSearch} />
      </section>
    </main>
  );
}
