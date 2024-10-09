import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TypePhoto } from "../../type/type.photo";

export async function fetchPhotos(
  query: string = "",
  page: number = 1,
  per_page: number = 24,
): Promise<TypePhoto[]> {
  const url = query
    ? `${process.env.VITE_API_UNSPLASH_URL}search/photos?page=${page}&query=${query}&per_page=${per_page}&client_id=${process.env.VITE_API_URL}`
    : `${process.env.VITE_API_UNSPLASH_URL}photos?page=${page}&per_page=${per_page}&client_id=${process.env.VITE_API_URL}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return query ? data.results : data;
}

export function usePhotoGallery(query: string = "") {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["photos", query, page],
    queryFn: () => fetchPhotos(query, page),
    enabled: query.trim() !== "",
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
