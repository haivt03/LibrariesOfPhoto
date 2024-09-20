import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCollection } from "../api/unsplash";
import { TypeCollections } from "../type/type";
import { CollectionCard } from "./CollectionCard";

export function Collections() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["collections", page],
    queryFn: () => fetchCollection(page),
    placeholderData: () => [],
    staleTime: 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="py-4 text-2xl font-bold">All of Collections</h1>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((collections: TypeCollections) => (
          <div key={collections.id} className="rounded-lg overflow-hidden shadow-lg">
            <CollectionCard collection={collections} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1 || isFetching}
          className={`px-4 py-2 rounded bg-gray-200 ${page === 1 || isFetching ? "cursor-not-allowed bg-gray-300" : ""}`}
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={isFetching}
          className={`px-4 py-2 rounded bg-gray-200 ${isFetching ? "cursor-not-allowed bg-gray-300" : ""}`}
        >
          Next
        </button>
      </div>

      {isFetching && <p>Fetching more data...</p>}
    </div>
  );
}
