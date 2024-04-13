import {
  Button,
  ComboboxItem,
  Container,
  DEFAULT_THEME,
  Flex,
  Image,
  Loader,
  Select,
  Space,
  Text,
  Title,
  useMantineColorScheme
} from '@mantine/core';
import { useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import { useActions } from '../../hooks/actions';
import styled from 'styled-components';
import { Paginations } from '../Paginations';
import NotFoundImageDark from '../../assets/icons/not-found-dark.svg';
import NotFoundImageLight from '../../assets/icons/not-found-light.svg';
import { apiKP } from '../../utils/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';

const ContainerMovies = styled(Container)<{
  colorscheme: string;
  loader: string;
}>`
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
  cursor: ${({ loader }) => (loader === 'true' ? 'not-allowed' : 'pointer')};
  opacity: ${({ loader }) => (loader === 'true' ? 0.5 : 1)};
  pointer-events: ${({ loader }) => (loader === 'true' ? 'none' : 'auto')};
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
  const { setMovies, setLoader, setPage, setLimit } = useActions();
  const filterData = useAppSelector(state => state.filters);
  const moviesData = useAppSelector(state => state.movies);
  const searchData = useAppSelector(state => state.searchResult);
  const navigate = useNavigate();
  const isMd = useMediaQuery('(min-width: 62em)');
  const sizeTitle = isMd ? '32px' : '22px';
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get('page') || '1';
  // const newSearchParams = new URLSearchParams(searchParams);
  // newSearchParams.set('page', String(queryPage));
  // setSearchParams(newSearchParams)
  useEffect(() => {

    if (searchData.searchValue === '' ) {
      setLoader(true);
      apiKP
        .getMovies(
          filterData.searchFilters.page,
          filterData.searchFilters.limit
        )
        .then(data => {
          if (data) {
            setMovies(data);
          }
          setLoader(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
    console.log(filterData)
  }, [filterData.searchFilters.page, filterData.searchFilters.limit, searchParams]);

  const handlerChangeLimit = (value: string | null, option: ComboboxItem | null) => {
    if (value !== null && option !== null) {
      setLimit(Number(value));
    }
  }




  return (
    <Container fluid w={'100%'} maw={800} mih={800}>
      <Flex
        style={{
          paddingBottom: '30px',
          marginBottom: '30px',
          borderBottom: `1px solid ${DEFAULT_THEME.colors.dark[2]}`
        }}
        justify={'space-between'}
        align={'center'}
      >
        <Title order={1} size={sizeTitle}>ФИЛЬМЫ И СЕРИАЛЫ:</Title>
        <Select value={filterData.searchFilters.limit.toString()} onChange={handlerChangeLimit} placeholder="Показывать по" data={['10', '25', '50']} w={'160px'}></Select>
      </Flex>

      <Flex direction={'column'} gap={'xs'}>
        {moviesData && moviesData.docs && moviesData.docs.length ? (
          moviesData.docs.map((movie, index) => (
            <ContainerMovies
              colorscheme={colorScheme}
              loader={searchData.loader ? 'true' : 'false'}
              key={index}
              onClick={() => {
                navigate(`/movie/${movie.id}`);
              }}
            >
              <Flex direction={'row'} justify={'space-between'} gap={'xs'}>
                <Image
                  w={72}
                  h={108}
                  src={
                    movie.poster.previewUrl ||
                    (colorScheme === 'dark'
                      ? NotFoundImageLight
                      : NotFoundImageDark)
                  }
                />
                <Flex direction={'column'} w={'100%'}>
                  <Text
                    size="md"
                    fw={700}
                    c={colorScheme === 'dark' ? 'white' : 'black'}
                  >
                    {movie.name}
                  </Text>
                  <Text size="xs">
                    {movie.alternativeName && movie.alternativeName + `, `}
                    {movie.year && movie.year !== 0 ? movie.year : ''}{' '}
                    {movie.movieLength && movie.movieLength !== 0
                      ? `, ` + movie.movieLength + ` мин.`
                      : ''}
                  </Text>
                  <Text size="xs">
                    {movie.countries[0].name}, {movie.genres[0].name}
                  </Text>
                  <Space h="sm" />
                  <Text size="xs" lineClamp={2}>
                    {movie.shortDescription
                      ? movie.shortDescription
                      : 'Описание отсутствует!'}
                  </Text>
                </Flex>
                <Text
                  size="xl"
                  fw={900}
                  variant="gradient"
                  gradient={{ from: 'red', to: 'yellow', deg: 90 }}
                >
                  {movie.rating.kp && movie.rating.kp !== 0
                    ? movie.rating.kp.toFixed(1)
                    : '—'}
                </Text>
              </Flex>
            </ContainerMovies>
          ))
        ) : (
          <Loader
            size={42}
            m={'auto'}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        )}
        <Paginations
          onChangePage={setPage}
          value={+queryPage}
          total={moviesData?.pages}
          size="sm"
        />
      </Flex>
    </Container>
  );
};
