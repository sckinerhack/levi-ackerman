import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import DbMoviesCarouselGenre from "@/components/DbMoviesCarouselGenre";
import { getMoviesByGenre, getTopRatedMoviesDb } from "@/lib/getDbMovies";

import { dbMovie } from "@/typings";

export default async function Home() {
  const topComedyMovies  = await getMoviesByGenre('35');
  const topActionMovies  = await getMoviesByGenre('28');
  const topHorrorMovies  = await getMoviesByGenre('27');
  const topRatedMoviesDb  = await getTopRatedMoviesDb();

  return (
    <main className="">
      <CarouselBannerWrapper />
      <div className="flex flex-col space-y-2 xl:-mt-48">
        <DbMoviesCarouselGenre movies={topRatedMoviesDb.data as dbMovie[]} title="Top Rated"/>
        <DbMoviesCarouselGenre movies={topComedyMovies.data as dbMovie[]} title="Comedy"/>
        <DbMoviesCarouselGenre movies={topActionMovies.data as dbMovie[]} title="Action"/>
        <DbMoviesCarouselGenre movies={topHorrorMovies.data as dbMovie[]} title="Horror"/>
      </div>
    </main>
  );
}