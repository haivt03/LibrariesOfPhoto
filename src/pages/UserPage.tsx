import { useState } from 'react';
import { HeaderHomePage } from '../components/Header';
import Footer from '../components/Footer';
import { UserDetails } from '../components/UserDetail';

export function UserPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto p-4">
      <HeaderHomePage onSearch={setQuery}/>
      <hr/>
      <UserDetails/>
      <Footer/>
    </div>
  );
}
