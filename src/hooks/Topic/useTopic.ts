import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TypeTopics } from "../../type/type.topic";

export async function fetchTopic(page: number = 1): Promise<TypeTopics[]> {
    const url = `${process.env.VITE_API_UNSPLASH_URL}topics?page=${page}&client_id=${process.env.VITE_API_URL}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }

export function useTopics() {
    const [page, setPage] = useState(1);
  
    const { data, error, isLoading, isFetching } = useQuery({
      queryKey: ["topics", page], 
      queryFn: () => fetchTopic(page),
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