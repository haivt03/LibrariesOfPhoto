import { useState } from 'react';
import { HeaderHomePage } from '../components/Header';
import Footer from '../components/Footer';
import { Collections } from '../components/Collections';

export function AllCollectionPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto p-4">
      <HeaderHomePage onSearch={setQuery}/>
      <hr/>
      <Collections/>
      <Footer/>
    </div>
  );
}
