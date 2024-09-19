import { useState } from 'react';
import { HeaderHomePage } from '../components/Header';
import Footer from '../components/Footer';
import { TopicPhoto } from '../components/TopicPhoto';

export function TopicPhotoPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto p-4">
      <HeaderHomePage onSearch={setQuery}/>
      <hr/>
      <TopicPhoto/>
      <Footer/>
    </div>
  );
}
