export interface TypePhoto {
  id: string;
  alt_description: string;
  urls: TypeUrls;
  user: TypeUser;
  slug: string;
}

export interface TypeUrls {
  small: string;
  full: string;
}

interface TypeUserLinks {
  html: string;
}

interface TypeUserImg {
  medium: string;
}

export interface TypeUser {
  id: string;
  username: string;
  name: string;
  links: TypeUserLinks;
  profile_image: TypeUserImg;
}

export interface TypeLocation {
  name: string;
}

export interface TypeTag {
  type: string;
  title: string;
}

export interface TypePhotoDetail {
  urls: TypeUrls;
  user: TypeUser;
  tags: TypeTag[];
  alt_description: string;
  likes: number;
  views: number;
  downloads: number;
  location: TypeLocation;
}

export interface FetchPhotosResponse {
  results: TypePhoto[];
  total: number;
  total_pages: number;
}

export interface TypeTopics {
  id: string;
  title: string;
  total_photos: number;
  user: TypeUser;
  cover_photo: TypePhoto;
  preview_photos: TypePreviewPhoto[];
}

export interface TypePreviewPhoto{
  id: string;
  urls: TypeUrls;

}

export interface TypeCollections {
  id: string;
  title: string;
  total_photos: number;
  user: TypeUser;
  cover_photo: TypePhoto;
  tag: TypeTag[];
  preview_photos: TypePreviewPhoto[];
}

export interface TypeUserDetail {
  id: string;
  username: string;
  name: string;
  bio: string;
  location?: string;
  profile_image?: TypePhoto;
  total_photos: number;
  total_likes: number;
  total_collections: number;
  instagram_username?: string;
  twitter_username?: string;
  for_hire: boolean;
  photos: TypePhoto[];
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
  };
}
