import { searchMoviesByGenre } from "@/lib/getDbMovies"; // Adjust the import path as necessary
import DbMovieCard from "@/components/DbMovieCard"; // Adjust the import path as necessary
import { dbMovie } from "@/typings";
import { getPaginationPages } from "@/lib/utils";

type GenrePageProps = {
  params: { id: string };
  searchParams: { genre: string; page?: string };
};

async function GenrePage({ params: { id }, searchParams: { genre, page } }: GenrePageProps) {
  const currentPage = page ? parseInt(page, 10) : 1;
  const limit = 21;
  const fetchedMoviesdata = await searchMoviesByGenre(id, currentPage, limit);

  if (fetchedMoviesdata.error) {
    return <div>Error: {fetchedMoviesdata.error}</div>;
  }

  const fetchedMovies = fetchedMoviesdata.data as dbMovie[];
  const totalPages = fetchedMoviesdata.totalPages;

  const pages = getPaginationPages(currentPage, totalPages as number);

  return (
    <div className="container my-20 mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 ml-10">{genre}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {fetchedMovies.map((movie) => (
          <div key={movie.id}>
            <DbMovieCard movie={movie} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <a
          href={`?genre=${genre}&page=${currentPage - 1}`}
          className={`pagination px-4 py-2 text-md mx-1 bg-gray-700 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </a>
        {pages.map((page, index) => (
          <a
            key={index}
            href={typeof page === 'number' ? `?genre=${genre}&page=${page}` : '#'}
            className={`pagination px-4 py-2 mx-1 bg-gray-700 rounded ${currentPage === page ? 'font-bold' : ''} ${typeof page === 'string' ? 'cursor-default' : ''}`}
          >
            {page}
          </a>
        ))}
        <a
          href={`?genre=${genre}&page=${currentPage + 1}`}
          className={`pagination px-4 py-2 mx-1 bg-gray-700 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </a>
      </div>
    </div>
  );
}

export default GenrePage;
