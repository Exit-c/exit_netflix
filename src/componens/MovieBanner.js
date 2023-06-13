import React from 'react';
import styled from 'styled-components';

const StyleBanner = styled.div`
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: -2;
  :before {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, black, transparent);
    z-index: -1;
  }
  .banner-title,
  .banner-overview {
    width: 50%;
    margin-left: 50px;
    color: #fff;
  }
`;

const MovieBanner = ({ movie }) => {
  return (
    <StyleBanner
      style={{
        backgroundImage:
          'url(' +
          `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path}` +
          ')',
      }}
    >
      <h1 className="banner-title">{movie.title}</h1>
      <p className="banner-overview">{movie.overview}</p>
    </StyleBanner>
  );
};

export default MovieBanner;
