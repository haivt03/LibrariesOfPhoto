import { TypeTag } from "./type";
import { TypePhoto, TypePreviewPhoto } from "./type.photo";
import { TypeUser } from "./type.user";

export interface TypeCollections {
  id: string;
  title: string;
  total_photos: number;
  user: TypeUser;
  cover_photo: TypePhoto;
  tag: TypeTag[];
  preview_photos: TypePreviewPhoto[];
  description: string
}
 