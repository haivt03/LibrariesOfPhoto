import { useState } from "react";
import { TypeCollections } from "../../type/type.collection";
import { TypePhoto } from "../../type/type.photo";
import { useQuery } from "@tanstack/react-query";

export async function fetchCollectionPhotos(
  collectionId: string,
  page: number,
): Promise<{ collectionDetails: TypeCollections; photos: TypePhoto[] }> {
  const url = `${process.env.VITE_API_UNSPLASH_URL}collections/${collectionId}/photos?page=${page}&per_page=24&client_id=${process.env.VITE_API_URL}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const collectionDetailsUrl = `${process.env.VITE_API_UNSPLASH_URL}collections/${collectionId}?client_id=${process.env.VITE_API_URL}`;
  const collectionResponse = await fetch(collectionDetailsUrl);
  if (!collectionResponse.ok) {
    throw new Error("Failed to fetch topic details");
  }

  const collectionDetails = await collectionResponse.json();

  const photos = await response.json();
  return { collectionDetails, photos };
}

export function useCollectionPhotos(collectionId: string | undefined) {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["collectionPhotos", collectionId, page],
    queryFn: () => fetchCollectionPhotos(collectionId!, page),
    enabled: !!collectionId,
    staleTime: 1000,
  });
  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return {
    collectionDetails: data?.collectionDetails || null,
    photos: data?.photos || null,
    page,
    isLoading,
    isFetching,
    error: error instanceof Error ? error : null,
    nextPage,
    prevPage
  };
}
