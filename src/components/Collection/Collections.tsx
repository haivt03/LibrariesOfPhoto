import { useCollections } from "../../hooks/Collection/useCollection";
import { CollectionCard } from "./CollectionCard";
import clsx from "clsx";

export function Collections() {
  const { data, error, isLoading, isFetching, page, nextPage, prevPage } =
    useCollections();

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Collection is empty</p>;

  return (
    <div className="p-4">
      <h1 className="py-4 text-2xl font-bold">All Collections</h1>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((collection) => (
          <div
            key={collection.id}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <CollectionCard collection={collection} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={page === 1 || isFetching}
          className={clsx(
            "px-4 py-2 rounded bg-gray-200",
            (page === 1 || isFetching) && "cursor-not-allowed bg-gray-300",
          )}
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={nextPage}
          disabled={isFetching}
          className={clsx(
            "px-4 py-2 rounded bg-gray-200",
            isFetching && "cursor-not-allowed bg-gray-300",
          )}
        >
          Next
        </button>
      </div>

      {isFetching && <p>Fetching more data...</p>}
    </div>
  );
}
