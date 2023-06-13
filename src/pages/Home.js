import React, { useEffect } from 'react';
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import MovieBanner from '../componens/MovieBanner';
import MovieSlide from '../componens/MovieSlide';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

const StyleBg = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyleBg2 = styled.div`
  background-color: #000;
  padding-top: 50px;
  padding-bottom: 100px;
  .home-h1 {
    margin: 30px 0;
    font-size: 30px;
    text-indent: 45px;
    color: #fff;
  }
`;
const Home = () => {
  const loading = useSelector((state) => state.movie.loading);
  const { popularMovies, topRatedMovies, upcomingMovies } = useSelector(
    (state) => state.movie
  );

  console.log('popular1', popularMovies);
  console.log('topRated2', topRatedMovies);
  console.log('upcoming3', upcomingMovies);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  if (loading) {
    return (
      <StyleBg>
        <ClipLoader color="red" loading={loading} size={150} />
      </StyleBg>
    );
  }
  return (
    <div>
      <div>
        <MovieBanner movie={popularMovies.results[0]} />
      </div>
      <StyleBg2>
        <h1 className="home-h1">Top Popular Movies</h1>
        <MovieSlide movies={popularMovies} />
        <h1 className="home-h1">Top Rated Movies</h1>
        <MovieSlide movies={topRatedMovies} />
        <h1 className="home-h1">Upcoming Movies</h1>
        <MovieSlide movies={upcomingMovies} />
      </StyleBg2>
    </div>
  );
};

export default Home;
