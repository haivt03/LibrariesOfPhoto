import { useQuery } from '@tanstack/react-query';
import { fetchAuthorInfo, fetchPhotoByAuthor } from '../api/unsplash';
import { PhotoCard } from '../components/PhotoCard';

interface AuthorPageProps {
  username: string;
}

export function AuthorPage({ username }: AuthorPageProps) {
  // Fetch author information
  const { data: author, isLoading: authorLoading, error: authorError } = useQuery({
    queryKey: ['author', username],
    queryFn: () => fetchAuthorInfo(username),
  });

  // Fetch photos by the author
  const { data: photos, isLoading: photosLoading, error: photosError } = useQuery({
    queryKey: ['photosByAuthor', username],
    queryFn: () => fetchPhotoByAuthor(username),
  });

  // Loading state
  if (authorLoading || photosLoading) return <p>Loading...</p>;

  // Error handling
  if (authorError || photosError) {
    const errorMessage = authorError instanceof Error ? authorError.message : photosError?.message;
    return <p>Error: {errorMessage}</p>;
  }

  // Render Author Information and Photos
  return (
    <div>
      {author && (
        <div className="mb-4">
          <h1 className="text-3xl">{author.name}</h1>
          <p>{author.bio}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {photos && photos.map((photo: any) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
