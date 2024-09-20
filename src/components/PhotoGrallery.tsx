import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPhotos } from '../api/unsplash';
import { PhotoCard } from './PhotoCard';
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
    <div className="photo-gallery-container p-4">
      <div className="photo-grid grid grid-cols-4 gap-4">
        {data?.map((photo: TypePhoto) => (
          <div key={photo.id} className="photo-card rounded-lg overflow-hidden shadow-md">
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      <div className="pagination flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:bg-gray-400 cursor-pointer"
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={isFetching}
          className="bg-gray-300 px-4 py-2 rounded disabled:bg-gray-400 cursor-pointer"
        >
          Next
        </button>
      </div>
      {isFetching && <p>Fetching more data...</p>}
    </div>
  );
}
