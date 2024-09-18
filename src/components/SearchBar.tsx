import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchCollection } from "../api/unsplash";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  const {
    data: collections,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: () => fetchCollection(5),
    placeholderData: () => [],
    staleTime: 1000,
  });

  return (
    <div className="searchbar-container">
      <div className="form-container">
        <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Search photos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
      </div>
      <div>
        {isLoading ? (
          <p>Loading collections...</p>
        ) : error instanceof Error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="collections-container">
            <div className="collections-container-text">
              <h3>Collection</h3>
              <li>See all</li>
            </div>
            <div className="collections-container-card">
              {collections?.map((collection: any) => (
                <div key={collection.id} className="collection-card">
                  <img
                    src={collection.cover_photo?.urls?.small}
                    alt={collection.title}
                    className="collection-image"
                  />
                  <h3 className="collection-title">{collection.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
