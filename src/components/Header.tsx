import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTopic } from "../hooks/Topic/useTopic";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface Topic {
  id: string;
  title: string;
}

export function HeaderHomePage({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  const home = () => {
    navigate("/home");
  };

  const handleOnclickDetail = (topicId: string) => {
    navigate(`/topics/${topicId}`);
  };

  const handleOnclickSeeAll = () => {
    navigate(`/topics/all`);
  };

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const data = await fetchTopic();
        setTopics(data);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };

    loadTopics();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
        <div className="header-column logo-section">
          <img
            onClick={home}
            src="https://logowik.com/content/uploads/images/unsplash8609.jpg"
            alt="Logo"
            className="w-36 mx-auto cursor-pointer"
          />
        </div>
        <input
          type="text"
          placeholder="Search photos..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 p-2 rounded-md flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white border-none py-2 px-4 rounded-md cursor-pointer"
        >
          Search
        </button>
      </form>
      <nav className="mt-4 bg-white p-2">
        <ul className="flex gap-4 list-none p-0 m-0">
          {topics.map((topic) => (
            <li
              onClick={() => handleOnclickDetail(topic.id)}
              key={topic.id}
              className="cursor-pointer p-1 rounded-md whitespace-nowrap bg-white hover:bg-gray-300 transition-colors duration-300 relative z-10 "
            >
              {topic.title}
            </li>
          ))}
          <li
            className="cursor-pointer p-1 rounded-md whitespace-nowrap bg-white hover:bg-gray-300 transition-colors duration-300 relative z-10"
            onClick={handleOnclickSeeAll}
          >
            See all
          </li>
        </ul>
      </nav>
    </div>
  );
}
