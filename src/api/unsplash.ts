const accessKey = "HqrLqnl1Wza8zGXbn1EWDTYf4_UhOnRSiV4HhYMzzqU";

export async function fetchPhotos(
  query: string = "",
  page: number = 1,
  per_page: number = 24,
): Promise<any[]> {
  const url = query
    ? `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=${per_page}&client_id=${accessKey}`
    : `https://api.unsplash.com/photos?page=${page}&per_page=${per_page}&client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return query ? data.results : data;
}

export async function fetchAuthorInfo(username: string): Promise<any> {
  const url = `https://api.unsplash.com/users/${username}?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  return response.json();
}

export async function fetchUserPhotos(username: string): Promise<any> {
  const url = `https://api.unsplash.com/users/${username}/photos?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch user photos");
  }
  return response.json();
}

export async function fetchUserLikes(username: string): Promise<any> {
  const url = `https://api.unsplash.com/users/${username}/likes?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch liked photos");
  }
  return response.json();
}

export async function fetchUserCollections(username: string): Promise<any> {
  const url = `https://api.unsplash.com/users/${username}/collections?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch user collections");
  }
  return response.json();
}

export async function fetchStatisticsByPhoto(id: string): Promise<any> {
  const url = `https://api.unsplash.com/photos/${id}/statistics?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function fetchTopic(page: number = 1): Promise<any> {
  const url = `https://api.unsplash.com/topics?page=${page}&client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function fetchTopicPhotos(
  topicId: string,
  page: number,
): Promise<any> {
  const url = `https://api.unsplash.com/topics/${topicId}/photos?page=${page}&per_page=24&client_id=${accessKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const topicDetailsUrl = `https://api.unsplash.com/topics/${topicId}?client_id=${accessKey}`;
  const topicResponse = await fetch(topicDetailsUrl);
  if (!topicResponse.ok) {
    throw new Error("Failed to fetch topic details");
  }

  const topicDetails = await topicResponse.json();

  const photos = await response.json();
  return { topicDetails, photos };
}

export async function fetchCollectionPhotos(
  collectionId: string,
  page: number,
): Promise<any> {
  const url = `https://api.unsplash.com/collections/${collectionId}/photos?page=${page}&per_page=24&client_id=${accessKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const collectionDetailsUrl = `https://api.unsplash.com/collections/${collectionId}?client_id=${accessKey}`;
  const collectionResponse = await fetch(collectionDetailsUrl);
  if (!collectionResponse.ok) {
    throw new Error("Failed to fetch topic details");
  }

  const collectionDetails = await collectionResponse.json();

  const photos = await response.json();
  return { collectionDetails, photos };
}

export async function fetchCollection(page: number = 1): Promise<any> {
  const url = `https://api.unsplash.com/collections?page=${page}&per_page=22&client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function fetchCollectionHome(page: number): Promise<any> {
  const url = `https://api.unsplash.com/collections?per_page=${page}&client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function fetchImageDetails(imageId: string): Promise<any> {
  const url = `https://api.unsplash.com/photos/${imageId}?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch image details");
  }
  const data = await response.json();
  return data;
}

export async function fetchRelatedImages(imageId: string): Promise<any> {
  const url = `https://api.unsplash.com/photos/${imageId}/related?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch related images");
  }
  const data = await response.json();
  return data;
}

export async function fetchRelatedCollections(imageId: string): Promise<any> {
  const url = `https://api.unsplash.com/collections/${imageId}/related?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch related collections");
  }
  const data = await response.json();
  return data;
}
