import { dbMovie } from "@/typings";
import PlayButton from "./ui/playButton";
import { extractMovieDetails } from "@/lib/utils";

function movieDetails({ movie }: { movie: dbMovie }) {
  let imageLink: string;
  let date: number | undefined;
  let movieDescription: string | undefined;
  let rating: number | undefined;
  let title: string | undefined | null;
  let extractedData: { title: string | null; year: string | null };
  let rtl = false;

  if (movie.poster_path) {
    imageLink = movie.poster_path;
    date = new Date(movie.release_date).getFullYear();
    movieDescription = movie.overview;
    rating = movie.vote_average;
    title = movie.original_title;
  } else {
    imageLink = movie.img_link;
    rating = 6.3;
    extractedData = extractMovieDetails(movie.title);
    title = extractedData.title;
    date = new Date(extractedData.year as string).getFullYear();
    movieDescription = movie.description;
    rtl = true;
  }
  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-full mb-4 md:mb-0">
          <img
            src={imageLink}
            alt="Movie Image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <PlayButton />
        </div>
        <div className="w-full md:w-2/3 md:ml-6">
          <h1 className="text-3xl text-[#1A1C29] font-bold mb-4">{title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-xl mr-2">⭐</span>
            <span className="text-xl text-yellow-600 font-semibold">
              {rating}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-gray-600 text-lg">
              Year of Release: {date}
            </span>
          </div>
          <div className="text-gray-700">
            <p dir={rtl ? "rtl" : ""}>{movieDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default movieDetails;
