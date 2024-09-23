import { TypePhoto } from "./type.photo";

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

interface TypeUserLink{
    self: string;
    html: string;
    photos: string;
    likes: string;
  };

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
  links: TypeUserLink;
}
