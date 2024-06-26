import {
  Button,
  Container,
  DEFAULT_THEME,
  Flex,
  Select,
  Title
} from '@mantine/core';
import styled from 'styled-components';
import { allFilters } from './constants';
import { useSearchParams } from 'react-router-dom';

const ContainerFilter = styled(Container)({
  border: `1px solid ${DEFAULT_THEME.colors.dark[2]}`,
  borderRadius: '12px',
  margin: '0'
});

export const FormFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (label: string) => {
    switch (label) {
      case 'year':
        return searchParams.get('year') || 'Все года';
      case 'genres':
        const genresName = searchParams.get('genres.name') || 'Все жанры';
        const capitalizedGenresName =
        genresName.charAt(0).toUpperCase() + genresName.slice(1);
        return capitalizedGenresName;
      case 'countries':
        return searchParams.get('countries.name') || 'Все страны';
      case 'ageRating':
        if(searchParams.get('ageRating')) {
          return (searchParams.get('ageRating') + '+') || 'Все возрастные рейтинги';
        } else {
          return 'Все возрастные рейтинги';
        }
      default:
        return '';
    }
  };

  const setParams = (label: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    switch (label) {
      case 'year':
        if (value !== '' && value !== 'Все года') {
          newSearchParams.set('year', value);
        } else {
          newSearchParams.delete('year');
        }
        break;
      case 'genres':
        if (value !== '' && value !== 'Все жанры') {
          newSearchParams.set('genres.name', value.toLowerCase());
        } else {
          newSearchParams.delete('genres.name');
        }
        break;
      case 'countries':
        if (value !== '' && value !== 'Все страны') {
          newSearchParams.set('countries.name', value);
        } else {
          newSearchParams.delete('countries.name');
        }
        break;
      case 'ageRating':
        if (value !== '' && value !== 'Все возрастные рейтинги') {
          newSearchParams.set('ageRating', value.replace('+', ''));
        } else {
          newSearchParams.delete('ageRating');
        }
        break;
      default:
        break;
    }

    setSearchParams(newSearchParams);
  };


  const clearFilters = () => {
    setSearchParams({});
  };



  return (
    <ContainerFilter w={300} maw={300} p={'20px'} mb={'30px'}>
      <Title order={5} m={'0 auto 20px'}>
        Фильтры:
      </Title>
      <Flex gap={'xs'} direction={'column'}>
        {allFilters.map((item, index) => (
            <Select
            label={item.placeholder}
            key={index}
            searchable={item.placeholder === 'Страна' ? true : false}
            data={item.data}
            w={'100%'}
            placeholder={item.placeholder}
            defaultValue={item.data[0]}
            value={getParams(item.label)}
            onChange={e => setParams(item.label, e || '')}
          />
        ))}
      </Flex>
      <Flex justify={'space-between'} gap={'10px'} mt={'20px'}>
        <Button w={'100%'} onClick={() => clearFilters()} color={DEFAULT_THEME.colors.dark[5]}>Очистить фильтр</Button>
      </Flex>
    </ContainerFilter>
  );
};
