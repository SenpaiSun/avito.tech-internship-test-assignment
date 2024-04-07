import {
  Container,
  DEFAULT_THEME,
  Flex,
  Image,
  Loader,
  Space,
  Text,
  Title,
  useMantineColorScheme
} from '@mantine/core';
import { useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import { useActions } from '../../hooks/actions';
import { useGetMoviesQuery } from '../../store/movies/movies.api';
import styled from 'styled-components';
import { Paginations } from '../Paginations';

const ContainerMovies = styled(Container)<{ colorscheme: string, fetching: boolean }>`
  margin: 0;
  border: 1px solid
    ${({ colorscheme }) =>
      colorscheme === 'dark'
        ? DEFAULT_THEME.colors.dark[4]
        : DEFAULT_THEME.colors.dark[1]};
  background-color: ${({ colorscheme }) =>
    colorscheme === 'dark'
      ? DEFAULT_THEME.colors.dark[6]
      : DEFAULT_THEME.colors.gray[1]};
  border-radius: 12px;
  width: 100%;
  padding: 10px;
  cursor: ${({ fetching }) => (fetching ? 'not-allowed' : 'pointer')};
  opacity: ${({ fetching }) => (fetching ? 0.5 : 1)};
  pointer-events: ${({ fetching }) => (fetching ? 'none' : 'auto')};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ colorscheme }) =>
      colorscheme === 'dark'
        ? DEFAULT_THEME.colors.dark[5]
        : DEFAULT_THEME.colors.gray[3]};
  }
`;

export const CardMovie = () => {
  const { colorScheme } = useMantineColorScheme();
  const { setMovies } = useActions();
  const filterData = useAppSelector(state => state.filters);
  const { data, isFetching } = useGetMoviesQuery({page: filterData.page, limit: filterData.limit});
  console.log(isFetching)
  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data, setMovies]);

  const moviesData = useAppSelector(state => state.movies);

  return (
    <Container fluid w={'100%'} maw={800} mih={800}>
      <Title order={1} style={{ paddingBottom: '30px', marginBottom: '30px', borderBottom: `1px solid ${DEFAULT_THEME.colors.dark[2]}` }}>ФИЛЬМЫ И СЕРИАЛЫ</Title>
      <Flex direction={'column'} gap={'xs'}>
        {moviesData.docs.length ?
          moviesData.docs.map((movie, index) => (
            <ContainerMovies colorscheme={colorScheme} fetching={isFetching} key={index}>
              <Flex direction={'row'} justify={'space-between'} gap={'xs'}>
                <Image w={72} h={108} src={movie.poster.previewUrl} />
                <Flex direction={'column'} w={'100%'}>
                  <Text
                    size="md"
                    fw={700}
                    c={colorScheme === 'dark' ? 'white' : 'black'}
                  >
                    {movie.name}
                  </Text>
                  <Text size="xs">
                    {movie.alternativeName && movie.alternativeName + `,`}{' '}
                    {movie.year && movie.year + `,`}{' '}
                    {movie.movieLength && movie.movieLength + `мин.`}
                  </Text>
                  <Text size="xs">
                    {movie.countries[0].name}, {movie.genres[0].name}
                  </Text>
                  <Space h="sm" />
                  <Text size="xs" lineClamp={2}>
                    {movie.shortDescription}
                  </Text>
                </Flex>
                <Text
                  size="xl"
                  fw={900}
                  variant="gradient"
                  gradient={{ from: 'red', to: 'yellow', deg: 90 }}
                >
                  {movie.rating.kp.toFixed(1)}
                </Text>
              </Flex>
            </ContainerMovies>
          )) : <Loader size={42} m={'auto'} color={colorScheme === 'dark' ? 'white' : 'black'} />}
          <Paginations/>
      </Flex>
    </Container>
  );
};
