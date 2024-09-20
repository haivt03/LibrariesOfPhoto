import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaLocationDot, FaSquareInstagram } from "react-icons/fa6";
import {
  fetchAuthorInfo,
  fetchUserPhotos,
  fetchUserLikes,
  fetchUserCollections,
} from "../api/unsplash";
import { useState } from "react";
import { TypePhoto } from "../type/type";
import { PhotoCard } from "./Photo/PhotoCard";
import { CollectionCard } from "./Collection/CollectionCard";

export function UserDetails() {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<"photos" | "likes" | "collections">("photos");

  // Fetch user info
  const { data: userInfo, error: userError, isLoading: userLoading } = useQuery({
    queryKey: ["userInfo", username],
    queryFn: () => fetchAuthorInfo(username!),
    enabled: !!username,
    staleTime: 1000,
  });

  // Fetch user's photos
  const { data: userPhotos, error: photosError, isLoading: photosLoading } = useQuery({
    queryKey: ["userPhotos", username],
    queryFn: () => fetchUserPhotos(username!),
    enabled: !!username,
    staleTime: 1000,
  });

  // Fetch user's liked photos
  const { data: likedPhotos, error: likesError, isLoading: likesLoading } = useQuery({
    queryKey: ["userLikes", username],
    queryFn: () => fetchUserLikes(username!),
    enabled: !!username,
    staleTime: 1000,
  });

  // Fetch user's collections
  const { data: userCollections, error: collectionsError, isLoading: collectionsLoading } = useQuery({
    queryKey: ["userCollections", username],
    queryFn: () => fetchUserCollections(username!),
    enabled: !!username,
    staleTime: 1000,
  });

  if (userLoading || photosLoading || likesLoading || collectionsLoading)
    return <p className="text-center">Loading user details...</p>;
  if (userError instanceof Error) return <p className="text-center">Error: {userError.message}</p>;

  const renderContent = () => {
    if (activeTab === "photos") {
      if (photosLoading) return <p>Loading photos...</p>;
      if (photosError instanceof Error) return <p>Error: {photosError.message}</p>;
      return (
        <div className="grid grid-cols-4 gap-5">
          {userPhotos?.map((photo: TypePhoto) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      );
    } else if (activeTab === "likes") {
      if (likesLoading) return <p>Loading liked photos...</p>;
      if (likesError instanceof Error) return <p>Error: {likesError.message}</p>;
      return (
        <div className="grid grid-cols-4 gap-5">
          {likedPhotos?.map((photo: any) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      );
    } else if (activeTab === "collections") {
      if (collectionsLoading) return <p>Loading collections...</p>;
      if (collectionsError instanceof Error) return <p>Error: {collectionsError.message}</p>;
      return (
        <div className="grid grid-cols-4 gap-5">
          {userCollections?.map((collection: any) => (
            <div key={collection.id} className="collection-card">
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="p-5 max-w-5xl mx-auto font-sans">
      {/* Profile Info */}
      <div className="text-center mb-5">
        <img
          src={userInfo?.profile_image?.large}
          alt={userInfo?.name}
          className="w-36 h-36 rounded-full object-cover mb-2"
        />
        <h1 className="text-2xl font-bold">{userInfo?.name}</h1>
        <p className="text-gray-600">{userInfo?.bio}</p>
        <div className="mt-2">
          {userInfo?.location && (
            <p className="flex items-center justify-center">
              <FaLocationDot className="mr-1" /> {userInfo.location}
            </p>
          )}
          {userInfo?.instagram_username && (
            <p className="flex items-center justify-center">
              <FaSquareInstagram className="mr-1" /> @{userInfo.instagram_username}
            </p>
          )}
        </div>
      </div>
      <hr className="my-5 border-gray-300" />
      {/* Tabs Section */}
      <div className="flex justify-center mb-5">
        {["photos", "likes", "collections"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 mx-1 rounded transition-colors ${activeTab === tab ? "bg-gray-800 text-white" : "bg-gray-200"} hover:bg-gray-300`}
            onClick={() => setActiveTab(tab as "photos" | "likes" | "collections")}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="flex justify-center">{renderContent()}</div>
    </div>
  );
}
