import {
  Flex,
  Container,
  Title,
  useMantineColorScheme,
  DEFAULT_THEME,
  Input,
  Autocomplete,
  Group,
  Avatar,
  AutocompleteProps,
  Text,
  Loader,
  CloseButton
} from '@mantine/core';
import { DarkLightButton } from '../DarkLightButton';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/actions';
import { useEffect, useState } from 'react';
import { useDebouncedSearch } from '../../hooks/debounce';
import { apiKP } from '../../utils/api';
const { REACT_APP_API_TOKEN } = process.env;

const ContainerHeader = styled(Container)<{ colorscheme: string }>`
  margin: 0px 0px 30px;
  padding: 0px 30px;
  border-bottom: 1px solid
    ${({ colorscheme }) =>
      colorscheme === 'dark'
        ? DEFAULT_THEME.colors.dark[4]
        : DEFAULT_THEME.colors.dark[1]};
  background-color: ${({ colorscheme }) =>
    colorscheme === 'dark'
      ? DEFAULT_THEME.colors.dark[6]
      : DEFAULT_THEME.colors.gray[4]};
  position: fixed;
  width: 100%;
  z-index: 2;
`;

export const Header = () => {
  const { colorScheme } = useMantineColorScheme();
  const searchValue = useAppSelector(state => state.searchResult.searchValue);
  const state = useAppSelector(state => state);
  const { setSearchValue, setMovies, setLoader } = useActions();
  const debouncedSearchValue = useDebouncedSearch(searchValue, 1000);
  const [value, setValue] = useState('Clear me');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue !== '') {
      setLoader(true);
      apiKP
        .searchMoviesByName(
          debouncedSearchValue,
          state.filters.searchFilters.page,
          state.filters.searchFilters.limit
        )
        .then(data => {
          console.log('поиск запрос', data);
          if (data) {
            setMovies(data);
          }
          setLoader(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
    console.log(state.searchResult.result);
  }, [debouncedSearchValue, state.filters.searchFilters.page, state.filters.searchFilters.limit]);

  const handlerInput = (value: string) => {
    setValue(value);
    setSearchValue(value);
  };

  const handlerInputDelete = () => {
    setSearchValue('');
    setLoader(true);
    apiKP
      .getMovies(state.filters.searchFilters.page, state.filters.searchFilters.limit)
      .then(data => {
        console.log('поиск запрос', data);
        if (data) {
          setMovies(data);
        }
        setLoader(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <ContainerHeader h={50} mt={'dm'} fluid colorscheme={colorScheme}>
      <Flex justify="space-between" align="center">
        <Link to="/movies" style={{ textDecoration: 'none' }}>
          <Title
            order={1}
            c={colorScheme === 'dark' ? 'white' : 'black'}
            fz={{ base: '24px', md: '32px' }}
          >
            AvitoCinema
          </Title>
        </Link>
        <Input
          value={searchValue}
          onChange={event => handlerInput(event.currentTarget.value)}
          radius="xl"
          placeholder="Поиск по названию"
          w={300}
          mt={4}
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              size="sm"
              aria-label="Clear input"
              onClick={() => handlerInputDelete()}
              style={{ display: value ? undefined : 'none' }}
            />
          }
          onKeyDown={event => {
            if (
              event.key === 'Enter' &&
              REACT_APP_API_TOKEN &&
              searchValue !== ''
            ) {
              setLoader(true);
              apiKP.searchMoviesByName(
                debouncedSearchValue,
                state.filters.searchFilters.page,
                state.filters.searchFilters.limit
              );
            }
          }}
        />
        <DarkLightButton></DarkLightButton>
      </Flex>
    </ContainerHeader>
  );
};
