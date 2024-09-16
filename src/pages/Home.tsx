import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { PhotoGallery } from '../components/PhotoGrallery';

export function Home() {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Unsplashy</h1>
      <SearchBar onSearch={setQuery} />
      <PhotoGallery query={query} />
    </div>
  );
}
