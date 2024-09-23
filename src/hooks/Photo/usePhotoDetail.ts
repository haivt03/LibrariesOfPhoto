import { useEffect, useState } from "react";
import { TypePhoto, TypePhotoDetail } from "../../type/type.photo";

const accessKey = "HqrLqnl1Wza8zGXbn1EWDTYf4_UhOnRSiV4HhYMzzqU";

export async function fetchImageDetails(
  imageId: string,
): Promise<TypePhotoDetail> {
  const url = `https://api.unsplash.com/photos/${imageId}?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch image details");
  }
  const data = await response.json();
  return data;
}

export async function fetchRelatedImages(imageId: string): Promise<TypePhoto> {
  const url = `https://api.unsplash.com/photos/${imageId}/related?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch related images");
  }
  const data = await response.json();
  return data;
}

export function usePhotoDetails(imageId: string | undefined){
    const [imageDetails, setImageDetails] = useState<TypePhotoDetail | null>(null);
    const [relatedImages, setRelatedImages] = useState<TypePhoto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const loadImageDetails = async () => {
        try {
          if (imageId) {
            const data: TypePhotoDetail = await fetchImageDetails(imageId);
            setImageDetails(data);
  
            const relatedImagesData = await fetchRelatedImages(imageId);
            setRelatedImages(relatedImagesData.results);
          }
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
      };
  
      loadImageDetails();
    }, [imageId]);
  
    return { imageDetails, relatedImages, isLoading, error };
  }
