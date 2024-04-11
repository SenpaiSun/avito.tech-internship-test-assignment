import { Carousel } from '@mantine/carousel';
import { SimilarMovie } from '../../store/movies/type';
import { Container, Title, Image, Tooltip, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Text} from '@mantine/core';

type CarouselMovieProps = {
  title: string;
  items: SimilarMovie[] | undefined;
};

export const CarouselMovie = (props: CarouselMovieProps) => {
  const { title, items } = props;
  const [similarMovies, setSimilarMovies] = useState<JSX.Element[] | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (items) {
      const slidersSimilar = items.map((item, index) => (
        <Tooltip label={item.name} position="bottom" key={index}>
          <Carousel.Slide>
            <Flex m={'0 auto'} justify={'center'}>
              <Image
                w={220}
                h={350}
                src={item.poster?.url}
                onClick={() => navigate(`/movie/${item.id}`)}
                style={{ cursor: 'pointer' }}
              />
            </Flex>
          </Carousel.Slide>
        </Tooltip>
      ));
      setSimilarMovies(slidersSimilar);
    }
  }, [items, navigate]);

  return (
    <Container>
      <Title m={'0 auto 30px'} w={'max-content'} order={2}>
        {title}
      </Title>
      {similarMovies && similarMovies.length > 0 ? <Carousel
        withIndicators
        slideSize="33.333333%"
        slideGap="0"
        loop
        align="start"
        slidesToScroll={3}
        controlsOffset="sl"
      >
        {similarMovies}
      </Carousel> : <Text m={'0 auto'} w={'max-content'}>Нет информации</Text>}
    </Container>
  );
};
