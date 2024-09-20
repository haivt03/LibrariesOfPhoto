import { TypePhoto } from "../../type/type";
import { useNavigate } from "react-router-dom";

interface PhotoCardProps {
  photo: TypePhoto;
}

export function PhotoCard({ photo }: PhotoCardProps) {
  const navigate = useNavigate();
  const handleOnclickMore = () => {
    navigate(`/photos/${photo.id}`);
  };

  return (
    <div className="photo-card-container mx-auto p-4 relative w-full max-w-md">
      <div className="photo-card-card-container bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1">
        <article className="photo-card-card-article relative">
          <img
            src={photo.urls.small}
            alt={photo.alt_description}
            className="photo-card-card-img w-full h-full object-cover"
          />
          <div className="photo-card-card-data p-4">
            <span className="photo-card-card-description text-sm text-gray-600">
              By {photo.user.name}
            </span>
            <h2 className="photo-card-card-title text-lg font-bold text-gray-800 mt-2 truncate">
              {photo.alt_description}
            </h2>
            <button
              onClick={handleOnclickMore}
              className="photo-card-card-button mt-2 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
            >
              More
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
