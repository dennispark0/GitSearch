import { useReducer, useState } from "react";
import Filter from "../../components/Filter/Filter";
import { SearchRepositoryRequest } from "../../models/search-request.model";
import searchService from "../../services/search.service";
import classes from "./search.module.css";
import { categoryReducer, extraFilters, initialCategories } from "../../constants/search-constants";
import LoginButton from "../../components/LoginButton/LoginButton";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import { Pagination } from "../../components/Pagination/Pagination";
import { RepositoryResultProps, RepositoryResult } from "../../components/RepositoryResult/RepositoryResult";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchCategories from "../../components/SearchCategories/SearchCategories";

export default function SearchPage() {
  const [results, setResults] = useState<RepositoryResultProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("desc");
  const [isSearching, setIsSearching] = useState(false);
  const [categories, dispatchCategory] = useReducer(categoryReducer, initialCategories);
  const [constraints, setConstraints] = useState<string[]>(new Array(extraFilters.length).fill(''));
  //the "category" property of a query needs to be in a format of "in:a,b,c.."
  const categoryQualifiers = () => {
    //simply omit the qualifier to search all dimensions.
    if (categories.has("all")) {
      return "";
    }
    return Array.from(categories).reduce((str, category, i) => {
      if (i <= 0) {
        return `${str}${category}`;
      }
      return `${str},${category}`;
    }, "in:");
  };

  const additionalFilterString = () => {
    return '';
  };

  const doSearch = async () => {
    if (isSearching || !query) {
      return;
    }
    setIsSearching(true);
    const _query: SearchRepositoryRequest = {
      q: `${query} ${categoryQualifiers()} ${additionalFilterString()}`,
      sort: sortBy,
      order: orderBy,
      page,
    };
    try {
      const { data } = await searchService.getRepositories(_query);
      const { items, total_count } = data;
      setResults(items);
      console.log(total_count, Math.floor(total_count / 30));
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

  return (
    <main className={classes.searchContainer} onKeyDown={submitOnEnter}>
      <section className={classes.mainSearchMenu}>
        <SearchBar isSearching={isSearching} query={query} setQuery={setQuery} doSearch={doSearch} />
        <Filter doSearch={doSearch} isSearching={isSearching} sortBy={sortBy} setSortBy={setSortBy} orderBy={orderBy} setOrderBy={setOrderBy} />
        <div className={classes.resultContainer}>
          {results.map((result, i) => (
            <RepositoryResult key={i} {...result} />
          ))}
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} isSearching={isSearching} doSearch={doSearch} />
      </section>
      <FilterMenu constraints={constraints} setConstraints={setConstraints}>
        <LoginButton />
        <SearchCategories categories={categories} dispatchCategory={dispatchCategory} />
      </FilterMenu>
    </main>
  );
}
