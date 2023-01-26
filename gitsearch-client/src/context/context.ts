import React from 'react';
import { initialCategories } from '../constants/search-constants';
/**
 * I will be honest. I leveraged Context mainly to demonstrate that I know how to use it.
 * For a project of this scale, it is more sensible to use "inversion of control" to prevent prop drilling.
 */
const initialState = {
    page : 1,
    query : '',
    isSearching : false,
    sortBy : '',
    orderBy : 'desc',
    categories : initialCategories,
};

const reducerTemplate = {
    setPage : new Function(),
    setQuery : new Function(),
    setIsSearching : new Function(),
    setOrderBy : new Function(),
    setSortBy : new Function(),
    dispatchCategory : new Function(),
}

export const AppContext = React.createContext(initialState);
export const AppDispatch = React.createContext(reducerTemplate);