import { useTopics } from "../../hooks/Topic/useTopic";
import { TopicsCard } from "./TopicsCard";

export function Topics() {
  const { data, error, isLoading, isFetching, page, nextPage, prevPage } =
    useTopics();

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="py-4 text-3xl">All Topics</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.map((topic) => (
          <div key={topic.id} className="rounded-lg overflow-hidden shadow-md">
            <TopicsCard topics={topic} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={page === 1 || isFetching}
          className={`bg-gray-300 py-2 px-4 rounded ${page === 1 || isFetching ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`}
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={nextPage}
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
