import { Container, Flex, Title, Text } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { useParams } from 'react-router-dom';
import { apiKP } from '../../utils/api';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import { MovieImage } from '../../components/MovieImage';
import { FilmInfo } from '../../components/FilmInfo/FilmInfo';
import { PaginationItems } from '../../components/Actors';

export const CurrentFilm = () => {
  const { setCurrentMovie, setPosters, setReview, setSeries } = useActions();
  const currentFilm = useAppSelector(state => state.searchResult);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const movie = await apiKP.searchMovieById(Number(id));
      setCurrentMovie(movie);
      const posters = await apiKP.searchPostersByIdMovie(Number(id), 1, 10);
      setPosters(posters);
      const series = await apiKP.searchSeriesByIdMovie(Number(id), 1, 10);
      console.log(series);
      setSeries(series);
      const review = await apiKP.searchReviewByIdMovie(Number(id), 1, 10);
      setReview(review);
    };

    fetchData();
  }, []);
  console.log(currentFilm);

  const actors = currentFilm.currentMovie.infoMovie?.persons
  const seriesData = currentFilm.series
  const episodes = currentFilm.series.flatMap(series => series.episodes);

  return (
    <Container fluid pt={'120px'}>
      <Flex direction={'column'} justify={'center'}>
        <Flex pb={'50px'}>
          <MovieImage
            posters={currentFilm.currentMovie.posters}
            prewievUrl={currentFilm.currentMovie.infoMovie.poster?.previewUrl}
          />
          <FilmInfo infoMovie={currentFilm.currentMovie.infoMovie} />
        </Flex>
        <Flex direction={'column'} gap={'lg'}>
          <PaginationItems
            items={
              actors
            }
            title={'АКТЕРЫ:'}
          />
          {currentFilm.currentMovie.infoMovie.isSeries && (<PaginationItems
            items={seriesData}
            title={'СПИСОК СЕЗОНОВ'}
          />)}
          {currentFilm.currentMovie.infoMovie.isSeries && (<PaginationItems
            items={episodes}
            title={'СПИСОК СЕРИЙ'}
          />)}
        </Flex>
      </Flex>
    </Container>
  );
};
