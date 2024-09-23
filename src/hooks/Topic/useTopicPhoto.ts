import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TypeTopics } from "../../type/type.topic";
import { TypePhoto } from "../../type/type.photo";

const accessKey = "HqrLqnl1Wza8zGXbn1EWDTYf4_UhOnRSiV4HhYMzzqU";

export async function fetchTopicPhotos(
  topicId: string,
  page: number,
): Promise<{ topicDetails: TypeTopics; photos: TypePhoto[] }> {
  const url = `https://api.unsplash.com/topics/${topicId}/photos?page=${page}&per_page=24&client_id=${accessKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const topicDetailsUrl = `https://api.unsplash.com/topics/${topicId}?client_id=${accessKey}`;
  const topicResponse = await fetch(topicDetailsUrl);
  if (!topicResponse.ok) {
    throw new Error("Failed to fetch topic details");
  }

  const topicDetails = await topicResponse.json();

  const photos = await response.json();
  return { topicDetails, photos };
}

export function useTopicPhotos(topicId: string | undefined) {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["topicPhotos", topicId, page],
    queryFn: () => fetchTopicPhotos(topicId!, page),
    enabled: !!topicId,
    staleTime: 1000,
  });

  const incrementPage = () => setPage((prevPage) => prevPage + 1);
  const decrementPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return {
    data,
    error,
    isLoading,
    isFetching,
    page,
    incrementPage,
    decrementPage,
  };
}
