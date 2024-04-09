import {
  Container,
  DEFAULT_THEME,
  Flex,
  Text,
  useMantineColorScheme
} from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { footerProps } from './constants';

const ContainerFooter = styled(Container)({
  borderTop: `1px solid ${DEFAULT_THEME.colors.dark[2]}`,
  width: '95%',
  bottom: 0,
  left: 0,
  right: 0,
  margin: '30px auto',
  paddingTop: '20px',
});
const LinkFooter = styled(Link)({
  textDecoration: 'none',
  '&:hover': {
    opacity: '0.7',
  }
});

export const Footer = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <ContainerFooter fluid >
      <Flex justify="space-between">
        <Flex>
          <Text>© 2024 AvitoCinema</Text>
        </Flex>
        <Flex direction={'column'} gap={'xs'}>
          <Text fw={700} size="lg">
            О сайте
          </Text>
          {footerProps.map((link, index) => (
            <LinkFooter to={link.href} key={index}>
              <Text c={colorScheme === 'dark' ? 'white' : 'black'} size="sm">
                {link.title}
              </Text>
            </LinkFooter>
          ))}
        </Flex>
      </Flex>
    </ContainerFooter>
  );
};
