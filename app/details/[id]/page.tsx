import { GetMovieWithId } from "@/lib/getDbMovies";
import MovieDetailsComponent from "@/components/MovieDetailsComponent";
import dynamic from "next/dynamic";

const Iframe = dynamic(() => import("@/components/Iframe"), {
  loading: () => <p className="mx-auto">Loading...</p>, // Optional: Show loading indicator
  ssr: false, // Optional: Disable server-side rendering for this component
});

async function movieDetails({ params: { id } }: any) {
  const movieData = await GetMovieWithId(id);
  return (
    <>
      <div className="sm:container mt-40 mx-auto w-[350px]">
        <div className="w-full flex justify-center">
          <h1 dir="rtl" className="text-white text-2xl font-bold">
            {movieData.data.title}
          </h1>
        </div>
        <MovieDetailsComponent movie={movieData.data} />
        <Iframe links={movieData.data.links} />
      </div>
    </>
  );
}

export default movieDetails;
