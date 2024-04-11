import NotFoundImageDark from '../../assets/icons/not-found-dark.svg';
import NotFoundImageLight from '../../assets/icons/not-found-light.svg';
import { useEffect, useState } from 'react';
import { Review } from '../store/movies/type';
import {
  Flex,
  Tooltip,
  useMantineColorScheme,
  Image,
  Container,
  Title,
  Text,
  DEFAULT_THEME
} from '@mantine/core';
import { Paginations } from '../components/Paginations';
import { formatDate } from '../utils/formateDate';
import styled from 'styled-components';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/hooks';

const ContainerReview = styled(Container)<{
  colorscheme: string;
}>`
  margin: 0;
  border: 1px solid
    ${({ colorscheme }) =>
      colorscheme === 'dark'
        ? DEFAULT_THEME.colors.dark[4]
        : DEFAULT_THEME.colors.dark[1]};
  background-color: ${({ colorscheme }) =>
    colorscheme === 'dark'
      ? DEFAULT_THEME.colors.dark[6]
      : DEFAULT_THEME.colors.gray[1]};
  border-radius: 12px;
  width: 100%;
  padding: 10px;

  &:hover {
    background-color: ${({ colorscheme }) =>
      colorscheme === 'dark'
        ? DEFAULT_THEME.colors.dark[5]
        : DEFAULT_THEME.colors.gray[3]};
  }
`;

export type PaginationReviewProps = {
  items: Review[];
  title: string;
};

export const PaginationReview = (props: PaginationReviewProps) => {
  const { items, title } = props;
  const { colorScheme } = useMantineColorScheme();
  const {setPageReview} = useActions();
  const statePages = useAppSelector((state) => state.searchResult.currentMovie.review);
  console.log(statePages)


  const [dataPagination, setDataPagination] = useState<
    JSX.Element[] | undefined
  >(undefined);
  useEffect(() => {
    if (items !== undefined && items.length > 0) {
      const newDataPagination = items
        .map((item, index) => {
          let author = item.author;
          let titleReview = item.title;
          let rewiew = item.review;
          let date = formatDate(item.date);
          return (
            <ContainerReview colorscheme={colorScheme}>
              <Flex direction={'column'} gap={'10px'}>
                <Flex
                  direction={'row'}
                  justify={'space-between'}
                  w={'100%'}
                  gap={'10px'}
                  align={'center'}
                  style={{
                    borderBottom: `1px solid ${DEFAULT_THEME.colors.dark[4]}`
                  }}
                >
                  <Text size="xl">{author}</Text>
                  <Text size="xs" fs={'italic'}>
                    {date}
                  </Text>
                </Flex>
                <Title order={5} fs={'italic'}>
                  {titleReview}
                </Title>
                <Text>{rewiew}</Text>
              </Flex>
            </ContainerReview>
          );
        });
      setDataPagination(newDataPagination);
    } else {
      setDataPagination([
        <Text>Нет отзывов</Text>
      ])
    }
  }, [colorScheme, items, title]);

  return (
    <Container m={'0 auto'} p={'0 0'}>
      <Flex
        direction={'column'}
        justify={'center'}
        align={'center'}
        gap={'20px'}
      >
        <Title w={'max-content'} order={2} >
          {title}
        </Title>
        <Flex direction={'column'} justify={'space-between'}>
          <Flex gap={'20px'}>
            {dataPagination && dataPagination[0]}
          </Flex>
          {items && (
            <Paginations
              value={statePages.page}
              total={statePages.total}
              size="xs"
              onChangePage={setPageReview}
            />
          )}
        </Flex>
      </Flex>
    </Container>
  );
};
