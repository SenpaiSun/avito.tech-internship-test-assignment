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
      <Flex justify={'start'} align={{ base: 'center', sm: 'start'}} direction={{ base: 'column', sm: 'row'}}>
        <FormFilter></FormFilter>
        <CardMovie></CardMovie>
      </Flex>
    </ContainerMovies>
  );
};
