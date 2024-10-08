import { useNavigate, useParams } from "react-router-dom";
import { PhotoCard } from "../Photo/PhotoCard";
import { TypeTopContributor } from "../../type/type.topic";
import { TypePhoto } from "../../type/type.photo";
import { useTopicPhotos } from "../../hooks/Topic/useTopicPhoto";
import clsx from "clsx";

export function TopicPhoto() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const {
    data,
    error,
    isLoading,
    isFetching,
    page,
    incrementPage,
    decrementPage,
  } = useTopicPhotos(topicId);

  const handleOnclickUser = (userName: string) => {
    navigate(`/users/${userName}`);
  };

  if (isLoading) return <p>Loading image details...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data available</p>;

  const { topicDetails, photos } = data;
  const title = topicDetails.title || "No Title Available";
  const description = topicDetails.description || "No description available.";
  const totalImages = topicDetails.total_photos || 0;

  return (
    <div className="p-4">
      <div className="flex justify-between items-end bg-gray-100 p-5 rounded-lg shadow-md mb-5">
        <div className="max-w-2/3 pb-8 pl-6">
          <h1 className="text-3xl text-gray-800 mb-2">{title}</h1>
          <h2 className="text-xl text-gray-600 mb-1">
            Total image: {totalImages}
          </h2>
          <h3 className="text-gray-500">{description}</h3>
        </div>
        <div className="max-w-xs bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-2xl text-gray-800 mb-2 border-b-2 border-gray-300 pb-2">
            Top Contributors
          </h3>
          {topicDetails.top_contributors?.length > 0 ? (
            <ul className="list-none p-0">
              {topicDetails.top_contributors.map(
                (contributor: TypeTopContributor) => (
                  <li
                    key={contributor.id}
                    className="flex items-center mb-4 cursor-pointer"
                    onClick={() => handleOnclickUser(contributor.username)}
                  >
                    <img
                      src={contributor.profile_image.small}
                      alt={contributor.id}
                      className="w-12 h-12 rounded-full border-2 border-blue-500 mr-3"
                    />
                    <div>
                      <h2 className="text-lg text-gray-600">
                        {contributor.name}
                      </h2>
                      <h3 className="text-sm text-gray-500">
                        {contributor.username}
                      </h3>
                    </div>
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p>No contributors available</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos?.map((photo: TypePhoto) => (
          <div key={photo.id} className="rounded-lg overflow-hidden shadow-md">
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={decrementPage}
          disabled={page === 1 || isFetching}
          className={clsx(
            "bg-gray-300 border-none py-2 px-4 rounded",
            page === 1 || isFetching
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-400",
          )}
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={incrementPage}
          disabled={isFetching}
          className={clsx(
            "bg-gray-300 border-none py-2 px-4 rounded",
            isFetching ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400",
          )}
        >
          Next
        </button>
      </div>

      {isFetching && <p className="mt-2">Fetching more data...</p>}
    </div>
  );
}
