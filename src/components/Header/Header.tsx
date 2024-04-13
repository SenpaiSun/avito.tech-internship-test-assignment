import {
  Flex,
  Container,
  Title,
  useMantineColorScheme,
  DEFAULT_THEME,
  em,
  Grid
} from '@mantine/core';
import { DarkLightButton } from '../DarkLightButton';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/hooks';
import { SearchInput } from '../SearchInput';
import { useMediaQuery } from '@mantine/hooks';

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
      : DEFAULT_THEME.white};
  position: fixed;
  width: 100%;
  z-index: 2;
`;

export const Header = () => {
  const { colorScheme } = useMantineColorScheme();
  const isMobile = useMediaQuery(`(max-width: ${em(550)})`);

  return (
    <ContainerHeader
      h={isMobile ? 100 : 50}
      mt={'dm'}
      fluid
      colorscheme={colorScheme}
      pt={6}
    >
      <Grid
        h={'100%'}
        w={'100%'}
        justify={'space-between'}
        align={'center'}
      >
        <Grid.Col order={1} span="content" >
          <Link to="/movies" style={{ textDecoration: 'none' }}>
            <Title
              order={1}
              c={colorScheme === 'dark' ? 'white' : 'black'}
              fz={{ base: '24px' }}
            >
              AvitoCinema
            </Title>
          </Link>
        </Grid.Col>
        <Grid.Col order={isMobile ? 3 : 2} span={!isMobile ? 'content' : 'auto'} >
          <SearchInput/>
        </Grid.Col>
        <Grid.Col order={isMobile ? 2 : 3} span="content" w={'auto'}>
          <DarkLightButton />
        </Grid.Col>
      </Grid>
    </ContainerHeader>
  );
};
