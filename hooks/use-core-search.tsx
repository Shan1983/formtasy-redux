import { PAGINATION } from "@/config/constants";
import { useEffect, useState } from "react";

interface UseCoreSearchProps<T extends { search: string; page: number }> {
  params: T;
  setParams: (params: T) => void;
  debounceMs?: number;
}

export function useCoreSearch<T extends { search: string; page: number }>({
  params,
  setParams,
  debounceMs = 500,
}: UseCoreSearchProps<T>) {
  const [localSearch, setLocalSearch] = useState(params.search);

  useEffect(() => {
    if (localSearch === "" && params.search !== "") {
      setParams({ ...params, search: "", page: PAGINATION.DEFAULT_PAGE });
      return;
    }

    const timer = setTimeout(() => {
      if (localSearch !== params.search) {
        setParams({
          ...params,
          search: localSearch,
          page: PAGINATION.DEFAULT_PAGE,
        });
      }
    }, debounceMs);

    return () => {
      clearTimeout(timer);
    };
  }, [localSearch, params.search, debounceMs, setParams, params]);

  useEffect(() => {
    const updateLocalSearch = () => {
      setLocalSearch(params.search);
    };

    updateLocalSearch();
  }, [params.search]);

  return {
    searchValue: localSearch,
    onSearchChange: setLocalSearch,
  };
}
