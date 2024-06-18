import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import DbMoviesCarousel from "@/components/DbMoviesCarousel";
import { getMoviesByGenre, getTopRatedMoviesDb } from "@/lib/getDbMovies";

import { dbMovie } from "@/typings";

export default async function Home() {
  const topComedyMovies  = await getMoviesByGenre('35');
  const topActionMovies  = await getMoviesByGenre('28');
  const topHorrorMovies  = await getMoviesByGenre('27');
  const topRatedMoviesDb  = await getTopRatedMoviesDb();

  return (
    <main className="">
      {/* @ts-expect-error Server Component */}
      <CarouselBannerWrapper />
      <div className="flex flex-col space-y-2 xl:-mt-48">
        <DbMoviesCarousel movies={topRatedMoviesDb.data as dbMovie[]} title="Top Rated"/>
        <DbMoviesCarousel movies={topComedyMovies.data as dbMovie[]} title="Comedy"/>
        <DbMoviesCarousel movies={topActionMovies.data as dbMovie[]} title="Action"/>
        <DbMoviesCarousel movies={topHorrorMovies.data as dbMovie[]} title="Horror"/>
      </div>
    </main>
  );
}
