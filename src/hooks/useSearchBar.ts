import { useQuery } from "@tanstack/react-query";
import { TypeCollections } from "../type/type.collection";

export async function fetchCollectionHome(page: number): Promise<any> {
    const url = `${process.env.VITE_API_UNSPLASH_URL}collections?per_page=${page}&client_id=${process.env.VITE_API_URL}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }

export function useCollections(limit: number) {
    return useQuery<TypeCollections[]>({
      queryKey: ["collections", limit],
      queryFn: () => fetchCollectionHome(limit),
      placeholderData: [],
      staleTime: 1000,
    });
  }