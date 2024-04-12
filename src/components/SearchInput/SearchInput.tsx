import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebouncedSearch } from "../../hooks/debounce";
import { useAppSelector } from "../../hooks/hooks";
import { useActions } from "../../hooks/actions";
import { apiKP } from "../../utils/api";
import { CloseButton, Input, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
const { REACT_APP_API_TOKEN } = process.env;

export const SearchInput = ({isMobile} : {isMobile: boolean | undefined}) => {
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
          if (data) {
            setMovies(data);
          }
          navigate('/movies');
          setLoader(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
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
              apiKP.searchMoviesByName(
                debouncedSearchValue,
                state.filters.searchFilters.page,
                state.filters.searchFilters.limit
              );
              navigate('/movies');
            }
          }}
        />
  );
};
