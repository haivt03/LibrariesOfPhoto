import { TypeUrls } from "./type";
import { TypePhoto, TypePreviewPhoto } from "./type.photo";
import { TypeUser } from "./type.user";

export interface TypeTopics {
    id: string;
    title: string;
    total_photos: number;
    user: TypeUser;
    cover_photo: TypePhoto;
    preview_photos: TypePreviewPhoto[];
    description: string;
    top_contributors: TypeTopContributor[];
  }

export interface TypeTopContributor{
  id: string;
  profile_image: TypeUrls;
  name: string;
  username: string;
}