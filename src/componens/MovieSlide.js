import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';
import styled from 'styled-components';

const StyleCardBox = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const MovieSlide = ({ movies }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <StyleCardBox>
      <Carousel responsive={responsive}>
        {movies.results.map((item, index) => (
          <MovieCard item={item} key={index} />
        ))}
      </Carousel>
    </StyleCardBox>
  );
};

export default MovieSlide;
