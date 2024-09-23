import { usePhotoGallery } from "../../hooks/Photo/usePhoto";
import { TypePhoto } from "../../type/type.photo";
import { PhotoCard } from "./PhotoCard";

export function PhotoGallery({ query = '' }) {
  const { data, error, isLoading, isFetching, page, nextPage, prevPage } = usePhotoGallery(query);

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) return <p>Error: {error.message}</p>;

  if (data?.length === 0) return <p>No results found for "{query}"</p>;

  return (
    <div className="photo-gallery-container p-4">
      <div className="photo-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.map((photo: TypePhoto) => (
          <div key={photo.id} className="photo-card rounded-lg overflow-hidden shadow-md">
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      <div className="pagination flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={page === 1 || isFetching}
          className="bg-gray-300 px-4 py-2 rounded disabled:bg-gray-400 cursor-pointer"
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={nextPage}
          disabled={isFetching}
          className="bg-gray-300 px-4 py-2 rounded disabled:bg-gray-400 cursor-pointer"
        >
          {isFetching ? 'Loading...' : 'Next'}
        </button>
      </div>

      {isFetching && <p>Fetching more data...</p>}
    </div>
  );
}