import { useNavigate } from "react-router-dom";
import { TypeTopics } from "../type/type";
import "./TopicsCard.css";

interface PhotoCardProps {
  topics: TypeTopics;
}

export function TopicsCard({ topics }: PhotoCardProps) {
  const navigate = useNavigate();

  const handleOnclickMore = () => {
    navigate(`/topics/${topics.id}`);
  };

  return (
    <div className="topic-card-container mx-auto p-4">
      <div className="topic-card-card-container">
        <article className="topic-card-card-article">
          <img
            src={topics.cover_photo.urls.small}
            alt={topics.title}
            className="topic-card-card-img"
          />

          <div className="topic-card-card-data p-4">
            <h2 className="topic-card-card-title">{topics.title}</h2>
            <button
              onClick={handleOnclickMore}
              className="topic-card-card-button"
            >
              More
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
