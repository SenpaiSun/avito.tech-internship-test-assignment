import {
  Container,
  DEFAULT_THEME,
  Flex,
  Image,
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

const ContainerMovies = styled(Container)<{ colorscheme: string }>`
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
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 10px;

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
  const { data } = useGetMoviesQuery();

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data, setMovies]);

  const moviesData = useAppSelector(state => state.movies);
  console.log(moviesData);

  return (
    <Container fluid w={'100%'} maw={800}>
      <Title order={1} style={{ paddingBottom: '30px', marginBottom: '30px', borderBottom: `1px solid ${DEFAULT_THEME.colors.dark[2]}` }}>ФИЛЬМЫ И СЕРИАЛЫ</Title>
      <Flex direction={'column'} gap={'xs'}>
        {moviesData &&
          moviesData.docs.map((movie, index) => (
            <ContainerMovies colorscheme={colorScheme} key={index}>
              <Flex direction={'row'} justify={'start'} gap={'xs'}>
                <Image w={72} h={108} src={movie.poster.previewUrl} />
                <Flex direction={'column'}>
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
          ))}
      </Flex>
    </Container>
  );
};
