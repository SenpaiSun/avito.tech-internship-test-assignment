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

type Fee = {
  value: number;
  currency: string;
};

type ProductionCompany = {
  name: string;
  url: string | null;
  previewUrl: string | null;
};

type SpokenLanguage = {
  name: string;
  nameEn: string;
};

type Person = {
  id: number;
  photo: string;
  name: string;
  enName: string | null;
  description: string;
  profession: string;
  enProfession: string;
};

type Fact = {
  value: string;
  type: "FACT" | "BLOOPER";
  spoiler: boolean;
};

type Premiere = {
  world: string;
  russia: string;
  bluray: string;
  dvd: string;
};

type Distributors = {
  distributor: string;
  distributorRelease: string;
};

type Video = {
  url: string;
  name: string;
  site: string;
  type: "TRAILER";
};

type SimilarMovie = {
  id: number;
  name: string;
  enName: string | null;
  alternativeName: string;
  type: string;
  poster: Poster;
  year: number;
  rating: Rating;
};

type Audience = {
  count: number;
  country: string;
};
export type infoMovie = {
  ageRating: number;
  fees: {
      world: Fee;
      russia: Fee;
      usa: Fee;
  };
  status: null;
  externalId: {
      imdb: string;
      tmdb: number;
      kpHD: string;
  };
  rating: Rating;
  votes: Votes;
  backdrop: Backdrop;
  movieLength: number;
  images: {
      postersCount: number;
      backdropsCount: number;
      framesCount: number;
  };
  productionCompanies: ProductionCompany[];
  spokenLanguages: SpokenLanguage[];
  id: number;
  type: string;
  name: string;
  description: string;
  distributors: Distributors;
  premiere: Premiere;
  slogan: string;
  year: number;
  budget: Fee;
  poster: Poster;
  facts: Fact[];
  genres: { name: string }[];
  countries: { name: string }[];
  seasonsInfo: any[];
  persons: Person[];
  lists: string[];
  typeNumber: number;
  alternativeName: string;
  enName: string | null;
  names: { name: string; language?: string; type: any }[];
  similarMovies: SimilarMovie[];
  top10: null;
  top250: number;
  audience: Audience[];
  deletedAt: null;
  isSeries: boolean;
  seriesLength: null;
  totalSeriesLength: null;
  networks: null;
  videos: {
      trailers: Video[];
  };
};

export type Posters = {
  url: string;
  createdAt: string;
  height: number;
  previewUrl: string;
  type: string;
  updatedAt: string;
  width: number;
  movieId: number;
  id: string;
}

type Review = {
  id: number;
  movieId: number;
  title: string;
  type: string;
  review: string;
  date: string;
  author: string;
  userRating: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export type currentMovie = {
  infoMovie: Partial<infoMovie>;
  posters: Posters[];
  review: Review[];
}

export type searchResult = {
  searchValue: string,
  result: Movie[],
  loader: boolean,
  currentMovie: currentMovie
}