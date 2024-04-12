import { Carousel } from '@mantine/carousel';
import { SimilarMovie } from '../../store/movies/type';
import { Container, Title, Image, Tooltip, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Text} from '@mantine/core';

type CarouselMovieProps = {
  title: string;
  items: SimilarMovie[] | undefined;
  isMobile: boolean | undefined
};

export const CarouselMovie = (props: CarouselMovieProps) => {
  const { title, items, isMobile } = props;
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
                w={{base: '100px', xs: '150px', sm: '180px',md: '280px'}}
                h={{base: '100px', xs: '190px', sm: '220px',md: '350px'}}
                src={item.poster?.url}
                onClick={() => navigate(`/movie/${item.id}`)}
                style={{ cursor: 'pointer' }}
              />
            </Flex>
          </Carousel.Slide>
        </Tooltip>
      ));
      setSimilarMovies(slidersSimilar);
    } else {
      setSimilarMovies(undefined); // Обнуляем similarMovies
    }
  }, [items, navigate]);

  return (
    <Container w={'100%'}>
      <Title m={'0 auto 30px'} w={'max-content'} order={2}>
        {title}
      </Title>
      {similarMovies && similarMovies.length > 0 ? <Carousel
        slideSize="33.333333%"
        slideGap="10px"
        loop
        align="start"
        slidesToScroll={isMobile ? 1 : 3}
        controlsOffset="sl"
      >
        {similarMovies}
      </Carousel> : <Text m={'0 auto'} w={'max-content'}>Нет информации</Text>}
    </Container>
  );
};
