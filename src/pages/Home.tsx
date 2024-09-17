import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { PhotoGallery } from '../components/PhotoGrallery';
import { HeaderHomePage } from '../components/Header';
import Footer from '../components/Footer';

export function Home() {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto p-4">
      <HeaderHomePage onSearch={setQuery}/>
      <hr/>
      <SearchBar onSearch={setQuery} />
      <PhotoGallery query={query} />
      <Footer/>
    </div>
  );
}
