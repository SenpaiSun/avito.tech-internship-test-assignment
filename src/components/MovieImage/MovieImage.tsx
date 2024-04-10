import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { MovieImageProps } from './type';

export const MovieImage = (props: MovieImageProps) => {
  const {posters, prewievUrl} = props;

  const firstSlide = (
    <Carousel.Slide key="preview">
      <Image w={280} h={350} m={'0 auto'} src={prewievUrl} />
    </Carousel.Slide>
  );

  const otherSlides = posters.map((item, index) => (
    <Carousel.Slide key={index} >
      <Image w={280} h={350} m={'0 auto'} src={item.url} />
    </Carousel.Slide>
  ));

  return (
    <>
     {posters && (
          <Carousel loop pb={'50px'} withIndicators w={400} h={350}>{firstSlide}{otherSlides}</Carousel>
        )}
    </>
  );
}