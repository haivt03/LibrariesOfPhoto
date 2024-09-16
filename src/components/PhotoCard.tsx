
import { AiFillHeart } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import './PhotoCard.css'; 

interface PhotoCardProps {
  photo: any;
}

export function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <div className="photo-card-container mx-auto p-4">
      <div className="photo-card-card-container">
        <article className="photo-card-card-article">
          <img
            src={photo.urls.small}
            alt={photo.alt_description}
            className="photo-card-card-img"
          />
          <div className="photo-card-button-group absolute top-0 right-0 p-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button type="button" className="photo-card-card-button photo-card-heart-button">
              <AiFillHeart />
            </button>
            <button type="button" className="photo-card-card-button photo-card-plus-button">
              <AiOutlinePlus />
            </button>
          </div>
          <div className="photo-card-card-data p-4">
            <span className="photo-card-card-description">By {photo.user.name}</span>
            <h2 className="photo-card-card-title">{photo.alt_description}</h2>
            <a href="#" className="photo-card-card-button">
              More
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
