import {
  Flex,
  Container,
  Title,
  useMantineColorScheme,
  DEFAULT_THEME,
} from '@mantine/core';
import { DarkLightButton } from '../DarkLightButton';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/hooks';
import { SearchInput } from '../SearchInput';

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
        <SearchInput />
        <DarkLightButton></DarkLightButton>
      </Flex>
    </ContainerHeader>
  );
};
