import React from 'react';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StyleCard = styled.div`
  width: 300px;
  height: 200px;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #000;
  background-size: cover;
  transition: 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  .movie-info {
    opacity: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: 0.5s;
    color: #fff;
  }
  :hover {
    opacity: 1;
  }
  .genre {
    margin-right: 5px;
  }
  .vote {
    position: absolute;
    left: 15px;
    bottom: 5px;
  }
  .vote span:first-child {
    margin-right: 10px;
  }
`;

const MovieCard = ({ item }) => {
  let navigate = useNavigate();
  const { genreList } = useSelector((state) => state.movie);
  const goToMovieDetail = () => {
    navigate(`/movie/${item.id}`);
  };
  return (
    <StyleCard
      onClick={goToMovieDetail}
      style={{
        backgroundImage:
          'url(' +
          `https://www.themoviedb.org/t/p/w710_and_h400_multi_faces${item?.poster_path}` +
          ')',
      }}
    >
      <div className="movie-info">
        <h2>{item?.title}</h2>
        <div>
          {item?.genre_ids?.map((id, index) => (
            <Badge bg="danger" className="genre" key={index}>
              {genreList.find((item) => item.id === id).name}
            </Badge>
          ))}
        </div>
        <div className="vote">
          <span>{item?.vote_average}</span>
          <span>{item?.adult ? '청불' : 'Under 18'}</span>
        </div>
      </div>
    </StyleCard>
  );
};

export default MovieCard;
