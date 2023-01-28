import { useEffect } from "react";

export interface PaginationProps {
  doSearch: () => void;
  page : number;
  setPage : React.Dispatch<number>;
  totalPages : number;
  isSearching : boolean;
}

export function Pagination({ doSearch, page, setPage, totalPages, isSearching }: PaginationProps) {

  useEffect(() => {
    doSearch();
  }, [page]);

  const updatePage = async (_page: number) => {
    setPage(_page);
  };

  const Pages = () => {
    const pages = [];
    const start = page > 5 ? page - 5 : 1;
    const end = totalPages - page > 5 ? Math.max(page + 5, 10) : totalPages;
    for(let i = start; i <= end ;i ++) {
      pages[i] = 
      <button disabled={ isSearching } key={`page${i}`} onClick={(()=> updatePage(i))}>
         {page === i ? <b>{i}</b> : i}
      </button>;
    }
    return pages;
  }

  return (
    <div>
      <button disabled={isSearching || page <= 1} onClick={() => updatePage(page - 1)}>Prev</button>
      {Pages()}
      <button disabled={isSearching || page >= totalPages} onClick={() => updatePage(page + 1)}>Next</button>
    </div>
  );
}
