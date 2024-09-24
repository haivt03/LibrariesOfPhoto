import { SetStateAction } from "react";
import { TypeLocation, TypeTag, TypeUrls } from "./type";
import { TypeUser } from "./type.user";

export interface TypePhoto {
  results: SetStateAction<TypePhoto[]>;
  id: string;
  alt_description: string;
  urls: TypeUrls;
  user: TypeUser;
  slug: string;
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

  export interface TypePreviewPhoto{
    id: string;
    urls: TypeUrls;
  
  }