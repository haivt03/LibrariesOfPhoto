import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTopicPhotos } from "../api/unsplash";
import { PhotoCard } from "./PhotoCard";
import "./TopicPhoto.css";

export function TopicPhoto() {
  const { topicId } = useParams<{ topicId: string }>();

  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["topicPhotos", topicId, page],
    queryFn: () => fetchTopicPhotos(topicId!, page),
    enabled: !!topicId,
    staleTime: 1000,
  });

  if (isLoading) return <p>Loading image details...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  const { topicDetails, photos } = data;
  const title = topicDetails.title || "No Title Available";
  const description = topicDetails.description || "No description available.";
  const totalImages = topicDetails.total_photos || 0;
  return (
    <div className="photo-topic-container">
      <div className="photo-header">
        <div className="photo-topic-text">
          <h1>{title}</h1>
          <h2>Total image: {totalImages}</h2>
          <h3>{description}</h3>
        </div>
        <div className="top-contributors">
          <h3>Top Contributors</h3>
          {topicDetails.top_contributors?.length > 0 ? (
            <ul>
              {topicDetails.top_contributors.map((contributor: any) => (
                <li key={contributor.id}>
                  <img
                    src={contributor.profile_image.small}
                    alt={contributor.id}
                  />
                  <div className="top-contributors-text">
                    <h2>{contributor.name}</h2>
                    <h3>{contributor.username}</h3>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No contributors available</p>
          )}
        </div>
      </div>
      <div className="photo-grid">
        {photos?.map((photo: any) => (
          <div key={photo.id} className="photo-card">
            <PhotoCard photo={photo} />
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
