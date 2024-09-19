import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopic } from "../api/unsplash";
import { TypeTopics } from "../type/type";
import { TopicsCard } from "./TopicsCard";
import "./Topics.css";

export function Topics() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["topics", page], 
    queryFn: () => fetchTopic(page),
    placeholderData: () => [],
    staleTime: 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="topic-gallery-container">
        <h1>All of Topic</h1>
      <div className="topic-grid">
        {data?.map((topics: TypeTopics) => (
          <div key={topics.id} className="topic-card">
            <TopicsCard topics={topics} />
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1 || isFetching}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={isFetching}
        >
          Next
        </button>
      </div>

      {isFetching && <p>Fetching more data...</p>}
    </div>
  );
}
