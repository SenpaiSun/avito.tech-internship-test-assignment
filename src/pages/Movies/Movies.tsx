import { Container, Flex } from '@mantine/core';
import { FormFilter } from '../../components/FormFilter';
import styled from 'styled-components';
import { useGetMoviesQuery } from '../../store/movies/movies.api';

const ContainerMovies = styled(Container)({
  paddingTop: '120px',
  margin: '0 0'
});

export const Movies = () => {
  const {data} = useGetMoviesQuery()
  console.log(data)
  return (
    <ContainerMovies>
      <Flex justify={'start'} align={'start'}>
        <FormFilter></FormFilter>
      </Flex>
    </ContainerMovies>
  );
};
