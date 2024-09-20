import { useState } from 'react';
import { HeaderHomePage } from '../components/Header';
import Footer from '../components/Footer';
import { PhotosDetails } from '../components/Photo/PhotoDetail';

export function PageDetailPhoto() {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto p-4">
      <HeaderHomePage onSearch={setQuery}/>
      <hr/>
      <PhotosDetails/>
      <Footer/>
    </div>
  );
}
