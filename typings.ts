export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Genres = {
  genres: Genre[];
};
type dbLink = {
  id: number;
  link: string;
  movie_id: number;
};

export type dbMovie = {
  _id: string;
  id: number;
  title: string;
  movie_link: string;
  img_link: string;
  description: string;
  backdrop_path: string;
  genre_ids: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  links: { id: number; link: string; movie_id: number }[];
};
