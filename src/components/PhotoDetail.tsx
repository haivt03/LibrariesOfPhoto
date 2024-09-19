import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchImageDetails, fetchRelatedImages } from "../api/unsplash";
import { TypePhoto, TypePhotoDetail, TypeTag } from "../type/type";
import "./PhotoDetail.css";

export function PhotosDetails() {
  const { imageId } = useParams<{ imageId: string }>();
  const navigate = useNavigate();  

  const [imageDetails, setImageDetails] = useState<TypePhotoDetail | null>(null);
  const [relatedImages, setRelatedImages] = useState<TypePhoto[]>([]);

  useEffect(() => {
    const loadImageDetails = async () => {
      try {
        if (imageId) {
          const data = await fetchImageDetails(imageId);
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

  if (!imageDetails) return <p>Loading image details...</p>;

  const handleOnclickDetail = (imageId: string) => {
    navigate(`/photos/${imageId}`);
  };

  return (
    <div className="image-details-container">
      <div className="image-details-main">
        <img
          src={imageDetails.urls.full}
          alt={imageDetails.alt_description}
          className="main-image"
        />
        <div className="image-info">
          <p>
            <strong>Views:</strong> {imageDetails.views}
          </p>
          <p>
            <strong>Likes:</strong> {imageDetails.likes}
          </p>
          <p>
            <strong>Downloads:</strong> {imageDetails.downloads}
          </p>
          {imageDetails.location && (
            <p>
              <strong>Location:</strong>{" "}
              {imageDetails.location.name || "Unknown"}
            </p>
          )}
        </div>
      </div>

      <div className="uploader-info">
        <a href={imageDetails.user.links.html} target="_blank" rel="noreferrer">
          <img
            src={imageDetails.user.profile_image.medium}
            alt={imageDetails.user.name}
            className="uploader-avatar"
          />
        </a>
        <h3>Uploaded by {imageDetails.user.name}</h3>
      </div>

      <div className="tags">
        <h4>Tags:</h4>
        <ul className="tag-list">
          {imageDetails.tags.map((tag: TypeTag) => (
            <li key={tag.title}>{tag.title}</li>
          ))}
        </ul>
      </div>

      <div className="related-section">
        <h3>Related Images</h3>
        <div className="related-images-grid">
          {relatedImages.map((relatedImage: TypePhoto) => (
            <img
              onClick={() => handleOnclickDetail(relatedImage.id)} 
              key={relatedImage.id}
              src={relatedImage.urls.small}
              alt={relatedImage.alt_description}
              className="related-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
