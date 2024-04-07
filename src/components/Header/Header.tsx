import {
  Flex,
  Container,
  Title,
  useMantineColorScheme,
  DEFAULT_THEME
} from '@mantine/core';
import { DarkLightButton } from '../DarkLightButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ContainerHeader = styled(Container)({
  margin: '30px 30px',
  padding: 0,
  borderBottom: `1px solid ${DEFAULT_THEME.colors.dark[2]}`
});

export const Header = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <ContainerHeader h={50} mt={'dm'} fluid>
      <Flex justify="space-between" align="center">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title
            order={1}
            c={colorScheme === 'dark' ? 'white' : 'black'}
            fz={{ base: '24px', md: '32px' }}
          >
            AvitoCinema
          </Title>
        </Link>
        <DarkLightButton></DarkLightButton>
      </Flex>
    </ContainerHeader>
  );
};
