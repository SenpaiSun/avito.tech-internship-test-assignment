import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedSearch } from "../../hooks/debounce";
import { useAppSelector } from "../../hooks/hooks";
import { useActions } from "../../hooks/actions";
import { apiKP } from "../../utils/api";
import { CloseButton, Input, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
const { REACT_APP_API_TOKEN } = process.env;

export const SearchInput = () => {
  const searchValue = useAppSelector(state => state.searchResult.searchValue);
  const state = useAppSelector(state => state);
  const { setSearchValue, setMovies, setLoader, setPage } = useActions();
  const debouncedSearchValue = useDebouncedSearch(searchValue, 1000);
  const [value, setValue] = useState<string>('Clear me');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = searchParams.get('page');
  const location = useLocation();

  const getMoviesByNameSearch = async () => {
    await apiKP
        .searchMoviesByName(
          debouncedSearchValue,
          state.filters.searchFilters.limit
        )
        .then(data => {
          if (data) {
            setMovies(data);
          }
          if(location.pathname !== '/movies') {
            navigate('/movies');
          }
          setLoader(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }

  useEffect(() => {
    if (searchValue !== '') {
      setLoader(true);
      getMoviesByNameSearch();
    }
  }, [debouncedSearchValue, pages, state.filters.searchFilters.limit]);

  const handlerInput = (value: string) => {
    setValue(value);
    setSearchValue(value);
  };

  const handlerInputDelete = () => {
    setSearchValue('');
    setLoader(true);
    apiKP
      .getMovies(state.filters.searchFilters.limit)
      .then(data => {
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
        <Input
          value={searchValue}
          onChange={event => handlerInput(event.currentTarget.value)}
          radius="xl"
          placeholder="Поиск по названию"
          w={280}
          m={'auto'}
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
              REACT_APP_API_TOKEN
            ) {
              setLoader(true);
              getMoviesByNameSearch();
            }
          }}
        />
  );
};
