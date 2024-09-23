import { useQuery } from "@tanstack/react-query";
import { TypeCollections } from "../type/type.collection";

const accessKey = "HqrLqnl1Wza8zGXbn1EWDTYf4_UhOnRSiV4HhYMzzqU";

export async function fetchCollectionHome(page: number): Promise<any> {
    const url = `https://api.unsplash.com/collections?per_page=${page}&client_id=${accessKey}`;
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