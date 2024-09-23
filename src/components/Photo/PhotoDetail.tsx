import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchImageDetails, fetchRelatedImages } from "../../api/unsplash";
import { TypePhoto, TypePhotoDetail } from "../../type/type.photo";
import { TypeTag } from "../../type/type";

export function PhotosDetails() {
  const { imageId } = useParams<{ imageId: string }>();
  const navigate = useNavigate();

  const [imageDetails, setImageDetails] = useState<TypePhotoDetail | null>(null);
  const [relatedImages, setRelatedImages] = useState<TypePhoto[]>([]);

  const handleOnclickUser = (userName: string) => {
    navigate(`/users/${userName}`);
  };

  useEffect(() => {
    const loadImageDetails = async () => {
      try {
        if (imageId) {
          const data: TypePhotoDetail = await fetchImageDetails(imageId);
          setImageDetails(data);

          const relatedImagesData = await fetchRelatedImages(imageId);
          setRelatedImages(relatedImagesData.results);
        }
      } catch (error) {
        console.error("Error fetching image details:", error);
      }
    };

    loadImageDetails();
  }, [imageId]);

  if (!imageDetails) return <p className="text-center">Loading image details...</p>;

  const handleOnclickDetail = (imageId: string) => {
    navigate(`/photos/${imageId}`);
  };

  return (
    <div className="flex flex-col p-5 max-w-5xl mx-auto">
      <div className="flex flex-col items-center">
        <img
          src={imageDetails.urls.full}
          alt={imageDetails.alt_description}
          className="max-w-full rounded-lg object-cover"
        />
        <div className="mt-2 text-center">
          <p><strong>Views:</strong> {imageDetails.views}</p>
          <p><strong>Likes:</strong> {imageDetails.likes}</p>
          <p><strong>Downloads:</strong> {imageDetails.downloads}</p>
          {imageDetails.location && (
            <p><strong>Location:</strong> {imageDetails.location.name || "Unknown"}</p>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <a href={imageDetails.user.links.html} target="_blank" rel="noreferrer">
          <img
            src={imageDetails.user.profile_image.medium}
            alt={imageDetails.user.name}
            className="w-12 h-12 rounded-full"
          />
        </a>
        <h3
          className="cursor-pointer hover:text-blue-600"
          onClick={() => handleOnclickUser(imageDetails.user.username)}
        >
          Uploaded by {imageDetails.user.name}
        </h3>
      </div>

      <div className="mt-5">
        <h4 className="font-semibold">Tags:</h4>
        <ul className="mt-2 list-none p-0 flex gap-2 flex-wrap">
          {imageDetails.tags.map((tag: TypeTag) => (
            <li key={tag.title} className="bg-gray-300 py-1 px-2 rounded-full">
              {tag.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h3 className="mb-2 font-semibold">Related Images</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {relatedImages.map((relatedImage: TypePhoto) => (
            <img
              onClick={() => handleOnclickDetail(relatedImage.id)}
              key={relatedImage.id}
              src={relatedImage.urls.small}
              alt={relatedImage.alt_description}
              className="rounded-lg cursor-pointer transform transition-transform duration-300 object-cover hover:translate-y-[-5px] hover:shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
