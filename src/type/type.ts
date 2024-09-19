
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
    userName: string;
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
  
  export interface FetchPhotoByAuthorResponse extends Array<TypePhoto> {}
  export interface FetchAuthorInfoResponse extends TypeUser {}
  export interface FetchStatisticsByPhotoResponse {
    views: number;
    downloads: number;
    likes: number;
  }
  export interface FetchTopicResponse extends Array<{ id: string; title: string }> {}
  export interface FetchCollectionResponse extends Array<{ id: string; title: string; cover_photo: TypePhoto }> {}
  export interface FetchRelatedImagesResponse {
    results: TypePhoto[];
  }
  export interface FetchRelatedCollectionsResponse {
    results: { id: string; title: string; cover_photo: TypePhoto }[];
  }
  