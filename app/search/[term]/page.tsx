import MoviesCarousel from "@/components/MoviesCarousel";
import DbMoviesCarousel from "@/components/DbMoviesCarousel";
import { searchMovies } from "@/lib/getDbMovies";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";
import { dbMovie } from "@/typings";

type Props = {
  params: {
    term: string;
  };
};

async function SearchPage({ params: { term } }: Props) {
  if (!term) notFound();

  const termToUse = decodeURI(term);

  const movies = await searchMovies(termToUse);
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-5 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {termToUse}</h1>
        {movies.data ? 
          <DbMoviesCarousel title="Movies" movies={movies.data as dbMovie[]} isVertical /> :
          <h1 className="text-md text-gray-300 leading-relaxed px-10">No match found for "{termToUse}"</h1>
          }
        

        <MoviesCarousel title="You may also like" movies={popularMovies} />
      </div>
    </div>
  );
}

export default SearchPage;
