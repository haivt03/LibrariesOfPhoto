import { useNavigate } from "react-router-dom";
import { TypeTopics } from "../../type/type.topic";
import { TypePreviewPhoto } from "../../type/type.photo";

interface PhotoCardProps {
  topics: TypeTopics;
}

export function TopicsCard({ topics }: PhotoCardProps) {
  const navigate = useNavigate();

  const handleOnclickMore = () => {
    navigate(`/topics/${topics.id}`);
  };

  return (
    <div className="relative max-w-full mx-auto w-80">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:translate-y-1">
        <article>
          <div className="grid grid-cols-2 gap-1">
            {topics.preview_photos?.map((photo: TypePreviewPhoto) => (
              <img
                key={photo.id}
                src={photo.urls.small}
                alt={photo.id}
                className="w-full h-64 object-cover"
              />
            ))}
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-700 truncate">{topics.title}</h2>
            <button
              onClick={handleOnclickMore}
              className="mt-2 bg-white text-black py-2 px-4 rounded transition-colors hover:bg-gray-200"
            >
              More
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
