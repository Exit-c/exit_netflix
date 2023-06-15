import React from 'react';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StyleRecommendation = styled.div`
  color: #fff;
  padding-top: 10px;
  padding-bottom: 50px;
  overflow: hidden;
  .reco-moviecard {
    width: 294px;
    height: 200px;
    float: left;
    background-size: cover;
    margin-bottom: 10px;
    position: relative;
  }
  .reco-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    transition: 0.4s;
    padding: 10px;
    .reco-genre {
      margin-right: 5px;
    }
    .reco-vote {
      position: absolute;
      bottom: 10px;
      span:first-child {
        margin-right: 8px;
      }
    }
  }
  .reco-bg:hover {
    opacity: 1;
  }
`;

const MovieRecommendation = ({ recommendation }) => {
  const { genreList } = useSelector((state) => state.movie);
  let navigate = useNavigate();
  const goToMovieDetail = (item) => {
    navigate(`/movie/${item?.id}`);
  };

  return (
    <StyleRecommendation>
      <h3>Recommendations</h3>
      {recommendation?.results.map((item, index) => (
        <div
          onClick={() => goToMovieDetail(item)}
          className="reco-moviecard"
          key={index}
          style={{
            backgroundImage: item.poster_path
              ? 'url(' +
                `https://www.themoviedb.org/t/p/w710_and_h400_multi_faces${item.poster_path}` +
                ')'
              : '',
          }}
        >
          <div className="reco-bg">
            <h2>{item.title}</h2>
            <div>
              {item.genre_ids?.map((id, index) => {
                const genre = genreList.find((item) => item.id === id);
                return genre ? (
                  <Badge bg="danger" key={index} className="page-genre">
                    {genre.name}
                  </Badge>
                ) : null;
              })}
            </div>
            <div className="reco-vote">
              <span>{item?.vote_average}</span>
              <span>{item?.adult ? '청불' : 'Under 18'}</span>
            </div>
          </div>
        </div>
      ))}
    </StyleRecommendation>
  );
};

export default MovieRecommendation;
