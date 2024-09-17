import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function HeaderHomePage({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  const home = () => {
    navigate("/home");
  };

  return (
    <div className="container" >
      <button onClick={home} className="button-home">
        Unsplashy
      </button>
      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-2 mb-4"
      >
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
      <nav>

      </nav>
    </div>
  );
}
