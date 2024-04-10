import {
  Button,
  Container,
  Flex,
  Image,
  Popover,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme
} from '@mantine/core';
import { Person, MovieEpisode, currentMovie, Episode } from '../../store/movies/type';
import NotFoundImageDark from '../../assets/icons/not-found-dark.svg';
import NotFoundImageLight from '../../assets/icons/not-found-light.svg';
import { Paginations } from '../Paginations';
import { useState } from 'react';

export type ActorsProps = {
  items: Person[] | MovieEpisode[] | Episode[] | undefined;
  title: string;
};

export const PaginationItems = (props: ActorsProps) => {
  const { items, title } = props;
  const { colorScheme } = useMantineColorScheme();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const dataActors = items?.slice(startIndex, endIndex).map((item, index) => {
    let photoUrl: string | undefined;
    if ('photo' in item) {
      photoUrl = item.photo;
    } else if ('poster' in item && item.poster?.url) {
      photoUrl = item.poster?.url;
    } else if ('still' in item && item.still?.url) {
      photoUrl = item.still?.url;
    }
    return (
      <Tooltip label={item.name ? item.name : 'Неизвестно'} position="bottom">
        <Flex key={index} direction={'column'}>
          <Flex w={'100%'}>
            <Image
              m={'0 0'}
              w={title === 'СПИСОК СЕРИЙ' ? '7vw' :'5vw'}
              h={title === 'СПИСОК СЕРИЙ' ? '4vw' : '8vw'}
              src={photoUrl ? photoUrl : colorScheme === 'dark' ? NotFoundImageLight : NotFoundImageDark}
              fit="cover"
            />
          </Flex>
          <Text
            size="xs"
            maw={'max-content'}
            lineClamp={1}
            style={{ cursor: 'pointer' }}
          >
            {item.name ? item.name : 'Неизвестно'}
          </Text>
        </Flex>
      </Tooltip>
    );
  });

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
          <Flex gap={'20px'}>{dataActors}</Flex>
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