import { FilmInfoProps } from './type';

export const getMovieInfo = (infoMovie: FilmInfoProps['infoMovie']) => {
  const genres = infoMovie.genres?.map(genre => genre.name).join(', ');
  const countries = infoMovie.countries?.map(genre => genre.name).join(', ');

  return [
    { title: 'Год производства', value: infoMovie.year },
    { title: 'Возрастной рейтинг', value: infoMovie.ageRating + '+' },
    { title: 'Жанр', value: genres },
    { title: 'Страна', value: countries },
    {
      title: 'Длительность',
      value: infoMovie.movieLength
        ? infoMovie.movieLength + ' мин.'
        : (infoMovie.seriesLength !== null ? infoMovie.seriesLength + ' мин.' : 'Неизвестно')
    },
    { title: 'Описание', value: infoMovie.description },
  ];
};