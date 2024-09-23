import { useState } from "react";
import { TypeCollections } from "../../type/type.collection";
import { useQuery } from "@tanstack/react-query";

const accessKey = "HqrLqnl1Wza8zGXbn1EWDTYf4_UhOnRSiV4HhYMzzqU";

export async function fetchCollection(
  page: number = 1,
): Promise<TypeCollections[]> {
  const url = `https://api.unsplash.com/collections?page=${page}&per_page=22&client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export function useCollections() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["collections", page],
    queryFn: () => fetchCollection(page),
    placeholderData: [],
    staleTime: 1000,
  });

  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return {
    data,
    error,
    isLoading,
    isFetching,
    page,
    nextPage,
    prevPage,
  };
}