import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPhotos } from '../api/unsplash';
import { PhotoCard } from './PhotoCard';
import './PhotoGallery.css'; 
import { TypePhoto } from '../type/type';

interface PhotoGalleryProps {
  query?: string;
}

export function PhotoGallery({ query = '' }: PhotoGalleryProps) {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['photos', query, page],
    queryFn: () => fetchPhotos(query, page),
    placeholderData: () => [],
    staleTime: 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="photo-gallery-container">
      <div className="photo-grid">
        {data?.map((photo: TypePhoto) => (
          <div key={photo.id} className="photo-card">
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={isFetching}
        >
          Next
        </button>
      </div>
      {isFetching && <p>Fetching more data...</p>}
    </div>
  );
}
