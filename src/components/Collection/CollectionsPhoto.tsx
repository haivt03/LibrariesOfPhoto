import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCollectionPhotos } from "../../api/unsplash";
import { TypePhoto } from "../../type/type";
import { PhotoCard } from "../Photo/PhotoCard";
import clsx from "clsx";

export function CollectionsPhoto() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["collectionPhotos", collectionId, page],
    queryFn: () => fetchCollectionPhotos(collectionId!, page),
    enabled: !!collectionId,

    staleTime: 1000,
  });

  const handleOnclickMore = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const { collectionDetails, photos } = data;
  const title = useMemo(() => {
    return collectionDetails.title || "No Title Available";
  }, [collectionDetails.title]);

  const description = useMemo(() => {
    return collectionDetails.description || "No description available.";
  }, [collectionDetails.description]);

  const totalImages = useMemo(() => {
    return collectionDetails.total_images || 0;
  }, [collectionDetails.photo_detail]);

  if (isLoading) return <p>Loading image details...</p>;
  if (!photos) return <p>The page is error</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  return (
    <div className="p-4">
      <div className="flex justify-between items-end bg-gray-100 p-5 rounded-lg shadow-md mb-5">
        <div className="max-w-3/4 pb-8 pl-8">
          <h1 className="text-3xl text-gray-800 mb-2">{title}</h1>
          <h2 className="text-xl text-gray-600 mb-1">
            Total images: {totalImages}
          </h2>
          <h3 className="text-gray-500">{description}</h3>
        </div>
        <div className="max-w-1/3 bg-white p-4 rounded-lg shadow-md mr-8">
          {/* Top Contributors (if needed) */}
        </div>
      </div>

      {/* Check if photos array is empty */}
      {photos.length === 0 && (
        <div className="text-center text-2xl">
          <p>No photos available in this collection.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg"
            alt="Placeholder"
            className="w-full max-w-lg mx-auto"
          />
        </div>
      )}

      {photos.length !== 0 && (
        <div className="grid grid-cols-4 gap-4">
          {photos.map((photo: TypePhoto) => (
            <div
              key={photo.id}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <PhotoCard photo={photo} />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleOnclickMore}
          disabled={page === 1 || isFetching}
          className={clsx("px-4 py-2 rounded bg-gray-200", {
            "cursor-not-allowed bg-gray-300": isFetching,
          })}
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={handleOnclickMore}
          disabled={isFetching}
          className={clsx("px-4 py-2 rounded bg-gray-200", {
            "cursor-not-allowed bg-gray-300": isFetching,
          })}
        >
          Next
        </button>
      </div>

      {isFetching && <p>Fetching more data...</p>}
    </div>
  );
}
