import { Carousel } from '@mantine/carousel';
import {
  Flex,
  Image,
  Title,
  Text,
  DEFAULT_THEME,
  useMantineColorScheme
} from '@mantine/core';
import { FilmInfoProps } from './type';
import { getMovieInfo } from './constants';

export const FilmInfo = (props: FilmInfoProps) => {
  const { colorScheme } = useMantineColorScheme();
  const colorTitleInfo =
    colorScheme === 'dark' ? DEFAULT_THEME.white : DEFAULT_THEME.black;
  const colorValueInfo =
    colorScheme === 'dark'
      ? DEFAULT_THEME.colors.dark[1]
      : DEFAULT_THEME.colors.gray[7];
  const { infoMovie } = props;
  const movieInfo = getMovieInfo(infoMovie);

  return (
    <Flex justify={'space-between'} direction={'row'} w={'100%'}>
      <Flex direction={'column'} ml={'20px'}>
        <Title order={1} size="h1" fw={700}>
          {infoMovie.name} {infoMovie.year ? '(' + infoMovie.year + ')' : ''}
        </Title>
        <Text ml={'10px'} fs="italic" mb={'20px'}>
          {infoMovie.alternativeName} &emsp;
          {infoMovie.ageRating ? infoMovie.ageRating + '+' : ''}
        </Text>
        {movieInfo.map((item, index) => (
          <Flex key={index} gap={'xs'} direction={'row'}>
            <Text>
              <span style={{ color: colorTitleInfo }}>{item.title}: </span>
              <span style={{ color: colorValueInfo }}>{item.value ? item.value : 'Неизвестно'}</span>
            </Text>
          </Flex>
        ))}
      </Flex>
      <Flex mr={'50px'}>
        <Text
          size="40px"
          fw={900}
          variant="gradient"
          gradient={{ from: 'red', to: 'yellow', deg: 90 }}
        >
          {infoMovie.rating?.kp && infoMovie.rating.kp !== 0
            ? infoMovie.rating.kp.toFixed(1)
            : '—'}
        </Text>
      </Flex>
    </Flex>
  );
};
