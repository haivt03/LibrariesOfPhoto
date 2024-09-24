import { TypePhoto } from "./type.photo";

export interface TypeUrls {
  small: string;
  full: string;
  large: string;
}

export interface TypeLocation {
  name: string;
}

export interface TypeTag {
  type: string;
  title: string;
}

export interface SearchPhotosResponse {
  total: number;
  total_pages: number;
  results: TypePhoto[];
}

export type Tab = "photos" | "likes" | "collections";