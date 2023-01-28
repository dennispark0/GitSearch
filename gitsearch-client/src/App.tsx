import { useReducer, useState } from "react";
import "./App.css";
import { RepositoryResultProps } from "./components/RepositoryResult/RepositoryResult";
import { AppContext, AppDispatch } from "./context/context";
import { categoryReducer, initialCategories } from "./constants/search-constants";
import Login from "./components/Login/Login";

function App() {
  //TODO: combine these into a reducer or something-- getting kinda nutty UwU
  const [results, setResults] = useState<RepositoryResultProps[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("desc");
  const [isSearching, setIsSearching] = useState(false);
  const [categories, dispatchCategory] = useReducer(categoryReducer, initialCategories);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ page, query, isSearching, sortBy, orderBy, categories, results, loggedIn }}>
      <AppDispatch.Provider value={{ setPage, setQuery, setIsSearching, setSortBy, setOrderBy, dispatchCategory, setResults, setLoggedIn }}>
        <div className="App">
          <Login />
        </div>
      </AppDispatch.Provider>
    </AppContext.Provider>
  );
}

export default App;
