import { Button, Container, DEFAULT_THEME, Flex, Select, Title } from '@mantine/core';
import styled from 'styled-components';
import { allFilters } from './constants';
import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/hooks';
import { SearchFilters } from '../../store/movies/type';

const ContainerFilter = styled(Container)({
  border: `1px solid ${DEFAULT_THEME.colors.dark[2]}`,
  borderRadius: '12px',
  margin: '0'
});

type Params = {
  year: string;
  countries: string;
  genres: string;
  ageRating: string;
};

export const FormFilter = () => {
  const { setYear, setGenre, setCountry, setAge, setSearchUrl } = useActions();
  const stateFilter = useAppSelector(state => state.filters.searchFilters);
  const [params, setParams] = useState<Params>({
    year: '',
    countries: '',
    genres: '',
    ageRating: ''
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const year = searchParams.get('year') || '';
    const countries = searchParams.get('countries') || '';
    const genres = searchParams.get('genres') || '';
    const ageRating = searchParams.get('ageRating') || '';
    setParams({
      year,
      countries,
      genres,
      ageRating
    });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      if (params[key as keyof Params]) {
        if (key !== 'countries' && key !== 'genres') {
          searchParams.append(key, params[key as keyof Params]);
        } else {
          searchParams.append(key + '.name', params[key as keyof Params]);
        }
      }
    }
    const queryString = searchParams.toString();
    const url =
      window.location.pathname + (queryString ? '?' + queryString : '');
    window.history.pushState({ path: url }, '', url);
    const searchUrl = window.location.pathname + '?' + queryString;
    setSearchUrl(searchUrl);
    console.log('asdasd')
  }, [params, setSearchUrl, stateFilter]);

  const handleChange = (key: keyof Params, value: string) => {
    switch (key) {
      case 'year':
        setYear(value);
        setParams(prevParams => ({
          ...prevParams,
          [key]: value
        }));
        break;
      case 'countries':
        setCountry(value);
        setParams(prevParams => ({
          ...prevParams,
          [key]: value
        }));
        break;
      case 'genres':
        setGenre(value);
        setParams(prevParams => ({
          ...prevParams,
          [key]: value.toLowerCase()
        }));
        break;
      case 'ageRating':
        setAge(value);
        setParams(prevParams => ({
          ...prevParams,
          [key]: value.replace('+', '')
        }));
        break;
    }
  };

  return (
    <ContainerFilter w={300} maw={300} p={'20px'} mb={'30px'}>
      <Title order={5} m={'0 auto 20px'}>Фильтры:</Title>
      <Flex gap={'xs'} direction={'column'}>
        {allFilters.map((item, index) => (
          <Select
            key={index}
            searchable={item.placeholder === 'Страна' ? true : false}
            data={item.data}
            w={'100%'}
            placeholder={item.placeholder}
            value={stateFilter[item.label as keyof SearchFilters] as string} //
            onChange={value =>
              handleChange(item.label as keyof Params, value ? value : '')
            }
          />
        ))}
      </Flex>
    </ContainerFilter>
  );
};
