type Rating = {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number | null;
};

type Votes = {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number | null;
};

type Backdrop = {
  url: string;
  previewUrl: string;
};

type Poster = {
  url: string;
  previewUrl: string;
};

type Genre = {
  name: string;
};

type Country = {
  name: string;
};

type Name = {
  name: string;
  language?: string;
  type?: string;
};

export type Movie = {
  status: null;
  rating: Rating;
  votes: Votes;
  backdrop: Backdrop;
  movieLength: number;
  id: number;
  type: string;
  name: string;
  description: string;
  year: number;
  poster: Poster;
  genres: Genre[];
  countries: Country[];
  typeNumber: number;
  alternativeName: string;
  enName: string | null;
  names: Name[];
  ratingMpaa: string;
  shortDescription: string;
  ticketsOnSale: boolean;
  ageRating: number;
  logo: { url: string };
  top10: null;
  top250: number | null;
  isSeries: boolean;
  seriesLength: null;
  totalSeriesLength: null;
};

export type Movies = {
  docs: Movie[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}