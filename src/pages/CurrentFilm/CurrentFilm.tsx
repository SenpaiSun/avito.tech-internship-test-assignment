import { Container, Flex, Title, Text } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { useParams } from 'react-router-dom';
import { apiKP } from '../../utils/api';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import { MovieImage } from '../../components/MovieImage';
import { FilmInfo } from '../../components/FilmInfo/FilmInfo';

export const CurrentFilm = () => {
  const { setCurrentMovie, setPosters, setReview } = useActions();
  const currentFilm = useAppSelector(state => state.searchResult);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const movie = await apiKP.searchMovieById(Number(id));
      setCurrentMovie(movie);
      const posters = await apiKP.searchPostersByIdMovie(Number(id), 1, 10);
      setPosters(posters);
      const review = await apiKP.searchReviewByIdMovie(Number(id), 1, 10);
      setReview(review);
    };

    fetchData();
  }, []);
  console.log(currentFilm);

  return (
    <Container fluid pt={'120px'}>
      <Flex>
        <MovieImage posters={currentFilm.currentMovie.posters} prewievUrl={currentFilm.currentMovie.infoMovie.poster?.previewUrl}/>
        <FilmInfo infoMovie={currentFilm.currentMovie.infoMovie}/>
      </Flex>
    </Container>
  );
};
