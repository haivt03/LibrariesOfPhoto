import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchCollectionHome } from "../api/unsplash";
// import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { TypeCollections } from "../type/type.collection";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  const handleOnclickDetail = (collectionId: string) => {
    navigate(`/collections/${collectionId}`);
  };

  const handleOnclickSeeAll = () => {
    navigate(`/collections/all`);
  };

  const {
    data: collections,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: () => fetchCollectionHome(5),
    placeholderData: () => [],
    staleTime: 1000,
  });

  return (
    <div className="searchbar-container flex mt-5 justify-around items-end">
      <div className="form-container w-3/4 ">
        <form
          onSubmit={handleSearch}
          className="flex gap-2 w-full h-10 items-end"
        >
          <input
            type="text"
            placeholder="Search photos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border px-3 py-2 rounded w-full text-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded text-lg hover:bg-blue-700 transition duration-200"
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
          <div className="collections-container bg-white shadow-md rounded-lg mt-4 p-4">
            <div className="collections-container-text flex gap-4 list-none justify-between mb-4">
              <h3 className="font-bold">Collection</h3>
              <li onClick={handleOnclickSeeAll} className="cursor-pointer mt-1">
                See all
              </li>
            </div>
            <div className="collections-container-card grid grid-cols-auto-fill gap-4">
              {collections?.map((collection: TypeCollections) => (
                <div
                  onClick={() => handleOnclickDetail(collection.id)}
                  key={collection.id}
                  className="collection-card flex whitespace-nowrap text-ellipsis border border-gray-300 rounded-lg overflow-hidden shadow-md cursor-pointer transform hover:-translate-y-1 hover:shadow-lg transition"
                >
                  <img
                    src={collection.cover_photo?.urls?.small}
                    alt={collection.title}
                    className="collection-image w-12 h-12 object-cover"
                  />
                  <h3 className="collection-title p-2 text-lg font-bold text-center truncate whitespace-nowrap overflow-hidden text-ellipsis">
                    {collection.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
