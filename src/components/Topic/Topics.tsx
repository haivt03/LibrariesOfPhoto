import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopic } from "../../api/unsplash";
import { TopicsCard } from "./TopicsCard";
import { TypeTopics } from "../../type/type.topic";

export function Topics() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["topics", page], 
    queryFn: () => fetchTopic(page),
    staleTime: 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="py-4 text-3xl">All of Topic</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.map((topics: TypeTopics) => (
          <div key={topics.id} className="rounded-lg overflow-hidden shadow-md">
            <TopicsCard topics={topics} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1 || isFetching}
          className={`bg-gray-300 py-2 px-4 rounded ${page === 1 || isFetching ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`}
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={isFetching}
          className={`bg-gray-300 py-2 px-4 rounded ${isFetching ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`}
        >
          Next
        </button>
      </div>

      {isFetching && <p className="mt-2">Fetching more data...</p>}
    </div>
  );
}
