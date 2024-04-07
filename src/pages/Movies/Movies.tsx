import { Container, Flex } from '@mantine/core';
import { FormFilter } from '../../components/FormFilter';
import styled from 'styled-components';
import { CardMovie } from '../../components/CardMovie';

const ContainerMovies = styled(Container)({
  paddingTop: '120px',
  margin: '0 0',
  width: '100%',
});

export const Movies = () => {

  return (
    <ContainerMovies fluid>
      <Flex justify={'start'} align={'start'} >
        <FormFilter></FormFilter>
        <CardMovie></CardMovie>
      </Flex>
    </ContainerMovies>
  );
};
