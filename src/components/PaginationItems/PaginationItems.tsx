import {
  Container,
  Flex,
  Grid,
  Image,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme
} from '@mantine/core';
import { Person, MovieEpisode, Episode, Review } from '../../store/movies/type';
import NotFoundImageDark from '../../assets/icons/not-found-dark.svg';
import NotFoundImageLight from '../../assets/icons/not-found-light.svg';
import { Paginations } from '../Paginations';
import { useEffect, useState } from 'react';
import { MockImage } from '../../assets/icons/MockImage';

export type PaginationProps = {
  items: Person[] | MovieEpisode[] | Episode[] | Review[] | undefined;
  title: string;
};

export const PaginationItems = (props: PaginationProps) => {
  const { items, title } = props;
  const { colorScheme } = useMantineColorScheme();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [dataPagination, setDataPagination] = useState<
    JSX.Element[] | undefined
  >(undefined);
  useEffect(() => {
    if (items !== undefined && items.length > 0) {
      const newDataPagination = items
        ?.slice(startIndex, endIndex)
        .map((item, index) => {
          let photoUrl: string | undefined;
          let name: string | undefined;
          if ('photo' in item) {
            photoUrl = item.photo;
            name = item.name;
          } else if ('episodesCount' in item) {
            photoUrl = item.poster?.url;
            name = item.name;
          } else if ('description' in item) {
            photoUrl = item.still?.url;
            name = item.name;
          }
          return (
            <Grid.Col span={{base: 10, xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
              <Tooltip
                label={name ? name : 'Неизвестно'}
                position="bottom"
                key={`${index}-${title}`}
              >
                <Flex direction={'column'} align={'center'}>
                  <Flex w={'100%'}>
                    <Image
                      m={'0 auto'}
                      w={title === 'СПИСОК СЕРИЙ' ? '140px' : '100'}
                      h={title === 'СПИСОК СЕРИЙ' ? '100' : '140'}
                      src={
                        photoUrl
                          ? photoUrl
                          : title === 'СПИСОК СЕРИЙ'
                            ? colorScheme === 'dark'
                              ? NotFoundImageLight
                              : NotFoundImageDark
                            : MockImage()
                      }
                      fit="cover"
                    />
                  </Flex>
                  <Text
                    size="xs"
                    maw={'max-content'}
                    lineClamp={1}
                    style={{ cursor: 'pointer' }}
                  >
                    {name ? name : 'Неизвестно'}
                  </Text>
                </Flex>
              </Tooltip>
            </Grid.Col>
          );
        });
      setDataPagination(newDataPagination);
    } else {
      setDataPagination([<Text key={`no-data-${title}`}>Нет данных</Text>]);
    }
  }, [colorScheme, endIndex, items, startIndex, title]);

  return (
    <Container m={'0 auto'} p={'0 0'}>
      <Flex
        direction={'column'}
        justify={'center'}
        align={'center'}
        gap={'20px'}
      >
        <Title w={'max-content'} order={2}>
          {title}
        </Title>
        <Flex direction={'column'} justify={'space-between'}>
          {dataPagination && dataPagination.length > 0 ? (
            <Grid
              h={'100%'}
              w={'100%'}
              justify={'center'}
              align={'center'}
              columns={20}
            >
              {dataPagination}
            </Grid>
          ) : (
            <Text>Нет данных</Text>
          )}
          {items && items.length > 10 && (
            <Paginations
              value={currentPage}
              total={Math.ceil((items.length || 0) / itemsPerPage)}
              size="xs"
              onChangePage={setCurrentPage}
            />
          )}
        </Flex>
      </Flex>
    </Container>
  );
};
