import { useState } from "react";
import { TypeCollections } from "../../type/type.collection";
import { TypePhoto } from "../../type/type.photo";
import { useQuery } from "@tanstack/react-query";

const accessKey = "HqrLqnl1Wza8zGXbn1EWDTYf4_UhOnRSiV4HhYMzzqU";

export async function fetchCollectionPhotos(
  collectionId: string,
  page: number,
): Promise<{ collectionDetails: TypeCollections; photos: TypePhoto[] }> {
  const url = `https://api.unsplash.com/collections/${collectionId}/photos?page=${page}&per_page=24&client_id=${accessKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const collectionDetailsUrl = `https://api.unsplash.com/collections/${collectionId}?client_id=${accessKey}`;
  const collectionResponse = await fetch(collectionDetailsUrl);
  if (!collectionResponse.ok) {
    throw new Error("Failed to fetch topic details");
  }

  const collectionDetails = await collectionResponse.json();

  const photos = await response.json();
  return { collectionDetails, photos };
}

export function useCollectionPhotos(collectionId: string | undefined){
    const [page, setPage] = useState(1);
  
    const { data, error, isLoading, isFetching } = useQuery({
      queryKey: ["collectionPhotos", collectionId, page],
      queryFn: () => fetchCollectionPhotos(collectionId!, page),
      enabled: !!collectionId,
      staleTime: 1000,
    });
  
    return {
      collectionDetails: data?.collectionDetails || null,
      photos: data?.photos || null,
      page,
      isLoading,
      isFetching,
      error: error instanceof Error ? error : null,
      setPage,
    };
  }