import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { fetchTopic } from "../api/unsplash";

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
    <div className="header-container">
      <form onSubmit={handleSearch} className="search-form">
        <button onClick={home} className="button-home">
          Unsplash
        </button>
        <input
          type="text"
          placeholder="Search photos..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <nav className="topics-nav">
        <ul className="topics-list">
          {topics.map((topic) => (
            <li
              onClick={() => handleOnclickDetail(topic.id)}
              key={topic.id}
              className="topic-item"
            >
              {topic.title}
            </li>
          ))}
          <li className="topic-item" onClick={handleOnclickSeeAll} >See all</li>
        </ul>
          <span></span>
      </nav>
    </div>
  );
}
