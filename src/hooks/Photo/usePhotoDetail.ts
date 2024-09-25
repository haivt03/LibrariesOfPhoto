import { TypePhoto, TypePhotoDetail } from "../../type/type.photo";
import { useQuery } from "@tanstack/react-query";

export async function fetchImageDetails(
  imageId: string,
): Promise<TypePhotoDetail> {
  const url = `${process.env.VITE_API_UNSPLASH_URL}photos/${imageId}?client_id=${process.env.VITE_API_URL}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch image details");
  }
  const data = await response.json();
  return data;
}

export async function fetchRelatedImages(imageId: string): Promise<TypePhoto> {
  const url = `${process.env.VITE_API_UNSPLASH_URL}photos/${imageId}/related?client_id=${process.env.VITE_API_URL}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch related images");
  }
  const data = await response.json();
  return data;
}

export function usePhotoDetails(imageId: string | undefined) {
  const {
    data: imageDetails,
    error: imageDetailsError,
    isLoading: isImageDetailsLoading,
  } = useQuery({
    queryKey: ["imageDetails", imageId],
    queryFn: () => fetchImageDetails(imageId as string),
  });

  const {
    data: relatedImagesData,
    error: relatedImagesError,
    isLoading: isRelatedImagesLoading,
  } = useQuery({
    queryKey: ["relatedImages", imageId],
    queryFn: () => fetchRelatedImages(imageId as string),
  });

  const isLoading = isImageDetailsLoading || isRelatedImagesLoading;
  const error = imageDetailsError || relatedImagesError;

  return {
    imageDetails,
    relatedImages: relatedImagesData?.results ?? [],
    isLoading,
    error,
  };
}
