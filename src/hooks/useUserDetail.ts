import { useQuery } from "@tanstack/react-query";
import { TypeCollections } from "../type/type.collection";
import { TypePhoto } from "../type/type.photo";
import { TypeUserDetail } from "../type/type.user";

export async function fetchAuthorInfo(
  username: string,
): Promise<TypeUserDetail> {
  const url = `${process.env.VITE_API_UNSPLASH_URL}users/${username}?client_id=${process.env.VITE_API_URL}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  return response.json();
}

export async function fetchUserPhotos(
  username: string,
): Promise<TypePhoto[]> {
  const url = `${process.env.VITE_API_UNSPLASH_URL}users/${username}/photos?client_id=${process.env.VITE_API_URL}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch user photos");
  }
  return response.json();
}

export async function fetchUserLikes(username: string): Promise<TypePhoto[]> {
  const url = `${process.env.VITE_API_UNSPLASH_URL}users/${username}/likes?client_id=${process.env.VITE_API_URL}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch liked photos");
  }
  return response.json();
}

export async function fetchUserCollections(username: string): Promise<TypeCollections[]> {
  const url = `${process.env.VITE_API_UNSPLASH_URL}users/${username}/collections?client_id=${process.env.VITE_API_URL}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch user collections");
  }
  return response.json();
}

// Hook for fetching user information
export function useUserInfo(username: string) {
  return useQuery({
    queryKey: ["userInfo", username],
    queryFn: () => fetchAuthorInfo(username),
    enabled: !!username,
    staleTime: 60000,  // Increased staleTime for user data
  });
}

// Hook for fetching user photos
export function useUserPhotos(username: string, enabled: boolean) {
  return useQuery({
    queryKey: ["userPhotos", username],
    queryFn: () => fetchUserPhotos(username),
    enabled: enabled && !!username,
    staleTime: 1000,
  });
}

// Hook for fetching user liked photos
export function useUserLikes(username: string, enabled: boolean) {
  return useQuery({
    queryKey: ["userLikes", username],
    queryFn: () => fetchUserLikes(username),
    enabled: enabled && !!username,
    staleTime: 1000,
  });
}

// Hook for fetching user collections
export function useUserCollections(username: string, enabled: boolean) {
  return useQuery({
    queryKey: ["userCollections", username],
    queryFn: () => fetchUserCollections(username),
    enabled: enabled && !!username,
    staleTime: 1000,
  });
}