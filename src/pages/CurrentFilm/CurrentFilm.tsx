import { Container, Flex, Button, DEFAULT_THEME, em } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { apiKP } from '../../utils/api';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import { MovieImage } from '../../components/MovieImage';
import { FilmInfo } from '../../components/FilmInfo/FilmInfo';
import { PaginationItems } from '../../components/PaginationItems';
import { PaginationReview } from '../../components/PaginationReview';
import { CarouselMovie } from '../../components/CarouselMovie';
import { useMediaQuery } from '@mantine/hooks';

export const CurrentFilm = () => {
  const { setCurrentMovie, setPosters, setReview, setSeries } = useActions();
  const currentFilm = useAppSelector(state => state.searchResult);
  const searchUrl = useAppSelector(state => state.filters.searchUrl);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const movie = await apiKP.searchMovieById(Number(id));
      setCurrentMovie(movie);
      const posters = await apiKP.searchPostersByIdMovie(Number(id), 1, 10);
      setPosters(posters);
      const series = await apiKP.searchSeriesByIdMovie(Number(id), 1, 10);
      setSeries(series);
    };

    fetchData();
  }, [navigate, id]);

  useEffect(() => {
    const fetchReview = async () => {
      const review = await apiKP.searchReviewByIdMovie(
        Number(id),
        currentFilm.currentMovie.review.page,
        currentFilm.currentMovie.review.limit
      );
      setReview(review);
    };
    fetchReview();
  }, [currentFilm.currentMovie.review.page, navigate, id]);

  const actors = currentFilm.currentMovie.infoMovie?.persons;
  const seriesData = currentFilm.series;
  const episodes = currentFilm.series.flatMap(series => series.episodes);
  const isSeries = currentFilm.currentMovie.infoMovie.isSeries;
  const review = currentFilm.currentMovie.review.docs;
  const similarMovies = currentFilm.currentMovie.infoMovie.similarMovies;
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);

console.log(searchUrl)
  return (
    <Container fluid pt={'120px'}>
      <Flex direction={'column'} justify={'center'}>
        <Button
          bg={DEFAULT_THEME.colors.gray[6]}
          w={'100px'}
          h={'30px'}
          onClick={() => navigate(searchUrl)}
          m={'0 0 50px 0'}
        >
          Назад
        </Button>
        <Flex pb={'50px'} direction={{base: 'column', md: 'row'}} align={{base: 'center', md:'start'}} gap={{base: '30px', md:'0'}}>
          <MovieImage
            posters={currentFilm.currentMovie.posters}
            prewievUrl={currentFilm.currentMovie.infoMovie.poster?.previewUrl}
          />
          <FilmInfo infoMovie={currentFilm.currentMovie.infoMovie} />
        </Flex>
        <Flex direction={'column'} gap={'lg'} w={'100%'} >
          <PaginationItems items={actors} title={'АКТЕРЫ:'} />
          {isSeries && (
            <PaginationItems items={seriesData} title={'СПИСОК СЕЗОНОВ'} />
          )}
          {isSeries && (
            <PaginationItems items={episodes} title={'СПИСОК СЕРИЙ'} />
          )}
          <PaginationReview items={review} title={'Отзывы пользователей:'} />
          <CarouselMovie items={similarMovies} title={'Похожие фильмы'} isMobile={isMobile}/>
        </Flex>
      </Flex>
    </Container>
  );
};
