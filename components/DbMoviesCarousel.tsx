import { dbMovie } from "@/typings";
import DbMovieCard from "./DbMovieCard";
import { cn } from "@/lib/utils";
// import { unstable_noStore } from 'next/cache';
// unstable_noStore()

type Props = { title?: string; movies: dbMovie[]; isVertical?: boolean };

function MoviesCarousel({ title, movies, isVertical }: Props) {
  return (
    <div className="z-40 scrollbar">
      <h2 className="text-xl font-bold px-10 py-2">{title}</h2>

      <div
        className={cn(
          "flex space-x-4 overflow-scroll scrollbar-hide px-5 lg:px-10 py-5",
          isVertical && "flex-col space-x-0 space-y-12"
        )}
      >
        {isVertical
          ? movies.map((movie) => (
              <div
                key={movie.id}
                className={cn(
                  isVertical &&
                    "flex flex-col space-y-5 mb-5 justify-between items-center lg:flex-row space-x-5"
                )}
              >
                <DbMovieCard movie={movie} />
                <div className="max-w-2xl">
                  <p dir="rtl" className="font-bold overflow-hidden">
                    {movie.title}
                  </p>
                  <hr className="mb-3" />
                  <p className="">{movie.overview}</p>
                </div>
              </div>
            ))
          : movies.map((movie) => <DbMovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}

export default MoviesCarousel;
