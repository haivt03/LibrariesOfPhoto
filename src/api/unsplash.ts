const accessKey = "HqrLqnl1Wza8zGXbn1EWDTYf4_UhOnRSiV4HhYMzzqU";

export async function fetchPhotos(
  query: string = "",
  page: number = 1,
): Promise<any[]> {
  const url = query
    ? `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`
    : `https://api.unsplash.com/photos?page=${page}&client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return query ? data.results : data;
}

export async function fetchPhotoByAuthor(
  authorUsername: string,
  page = 1,
): Promise<any> {
  const url = `https://api.unsplash.com/users/${authorUsername}/photos?page=${page}&client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function fetchAuthorInfo(authorUsername: string): Promise<any> {
  const url = `https://api.unsplash.com/users/${authorUsername}?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function fecthStatisticsByPhoto(id: string): Promise<any> {
  const url = `https://api.unsplash.com/photos/${id}/statistics?client_id=${accessKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}
