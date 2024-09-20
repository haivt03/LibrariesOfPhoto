import { useNavigate } from "react-router-dom";
import { TypeCollections, TypePreviewPhoto } from "../../type/type";

interface PhotoCardProps {
  collection: TypeCollections;
}

export function CollectionCard({ collection }: PhotoCardProps) {
  const navigate = useNavigate();

  const handleOnclickMore = () => {
    navigate(`/collections/${collection.id}`);
  };

  return (
    <div className="collection-card-container mx-auto p-4 max-w-full w-[500px]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:translate-y-[-5px]">
        <article className="relative">
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {collection.preview_photos?.map((photo: TypePreviewPhoto) => (
              <img
                key={photo.id}
                src={photo.urls.small}
                alt={photo.id}
                className="w-36 h-36 object-cover"
              />
            ))}
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-600 truncate">{collection.title}</h2>
            <button
              onClick={handleOnclickMore}
              className="mt-4 inline-block bg-white text-black py-2 px-4 rounded transition-colors hover:bg-gray-300"
            >
              More
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
