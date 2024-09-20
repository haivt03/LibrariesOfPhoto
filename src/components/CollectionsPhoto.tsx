import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCollectionPhotos } from "../api/unsplash";
import { PhotoCard } from "./PhotoCard";
import { TypePhoto } from "../type/type";

export function CollectionsPhoto() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["collectionPhotos", collectionId, page],
    queryFn: () => fetchCollectionPhotos(collectionId!, page),
    enabled: !!collectionId,
    staleTime: 1000,
  });

  if (isLoading) return <p>Loading image details...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  const { collectionDetails, photos } = data;
  const title = collectionDetails.title || "No Title Available";
  const description = collectionDetails.description || "No description available.";
  const totalImages = collectionDetails.total_photos || 0;

  return (
    <div className="p-4">
      <div className="flex justify-between items-end bg-gray-100 p-5 rounded-lg shadow-md mb-5">
        <div className="max-w-3/4 pb-8 pl-8">
          <h1 className="text-3xl text-gray-800 mb-2">{title}</h1>
          <h2 className="text-xl text-gray-600 mb-1">Total images: {totalImages}</h2>
          <h3 className="text-gray-500">{description}</h3>
        </div>
        <div className="max-w-1/3 bg-white p-4 rounded-lg shadow-md mr-8">
          {/* Top Contributors (if needed) */}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {photos?.map((photo: TypePhoto) => (
          <div key={photo.id} className="rounded-lg overflow-hidden shadow-lg">
            <PhotoCard photo={photo} />
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
