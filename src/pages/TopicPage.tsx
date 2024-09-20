import { useState } from 'react';
import { HeaderHomePage } from '../components/Header';
import Footer from '../components/Footer';
import { Topics } from '../components/Topic/Topics';

export function TopicPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto p-4">
      <HeaderHomePage onSearch={setQuery}/>
      <hr/>
      <Topics/>
      <Footer/>
    </div>
  );
}
