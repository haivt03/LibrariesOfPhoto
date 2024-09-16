import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPhotos } from '../api/unsplash';
import { PhotoCard } from './PhotoCard';

interface PhotoGalleryProps {
  query?: string;
}

export function PhotoGallery({ query = '' }: PhotoGalleryProps) {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['photos', query, page],
    queryFn: () => fetchPhotos(query, page),
    placeholderData: () => [],
    staleTime: 5000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((photo: any) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={isFetching}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
      {isFetching && <p>Fetching more data...</p>}
    </div>
  );
}
