import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';
import review from '../images/review.png';
import leadership from '../images/leadership.png';

const StyleMoviePageCard = styled.div`
  width: 400px;
  height: 600px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  color: #fff;
  transition: 0.3s;
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;

  &:hover {
    transform: scale(1.03);
  }
  .page-container {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    padding-right: 20%;
  }
  .page-genre {
    margin-right: 5px;
    margin-bottom: 5px;
    height: 30px;
    line-height: 20px;
    border-radius: 10px;
  }

  .page-title {
    margin-top: 20px;
    .page-poster {
      width: 100px;
      height: 150px;
      float: left;
    }
    h2 {
      float: left;
      width: 210px;
      padding-left: 15px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }
    span {
      float: left;
      padding-left: 15px;
      color: lightblue;
    }
  }
  .page-overview {
    clear: both;
    padding-top: 15px;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    overflow: hidden;
  }
  .page-vote {
    img {
      width: 25px;
      margin-right: 5px;
    }
    span {
      margin-right: 10px;
    }
    .page-adult {
      color: #dd3444;
    }
  }
`;

const StylePagination = styled.div`
  float: right;

  .page-link {
    width: 50px;
    height: 50px;
    background-color: #dd3444;
    margin: 5px;
    border-radius: 50%;
    text-align: center;
    line-height: 38px;
    border: none;
    color: #ccc;
  }
  .active a {
    color: #fff;
    font-weight: bold;
  }
  .pagination {
    margin-bottom: 0;
  }
`;

const MoviePagination = ({ movies, activePage, handlePageChange }) => {
  const navigate = useNavigate();
  const { genreList } = useSelector((state) => state.movie);
  const goToMovieDetail = (item) => {
    navigate(`/movie/${item?.id}`);
  };
  console.log('영화정보', movies);
  return (
    <div>
      {movies.map((item, index) => (
        <StyleMoviePageCard
          onClick={() => goToMovieDetail(item)}
          key={index}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original//${item.backdrop_path})`,
          }}
        >
          <div className="page-container">
            {item.genre_ids?.map((id, index) => (
              <Badge bg="danger" key={index} className="page-genre">
                {genreList.find((item) => item.id === id).name}
              </Badge>
            ))}
            <div className="page-title">
              <img
                className="page-poster"
                src={`https://image.tmdb.org/t/p/original//${item.poster_path}`}
              />
              <h2>{item.title}</h2>
              <span>{item.release_date.substr(0, 4)}</span>
            </div>
            <p className="page-overview">{item.overview}</p>
            <div className="page-vote">
              <a
                href="https://www.flaticon.com/kr/free-icons/-"
                title="고객 만족 아이콘"
              >
                {/* 고객 만족 아이콘 제작자: Freepik - Flaticon */}
                <img src={review} />
              </a>
              <span>{item.vote_average}</span>
              <a
                href="https://www.flaticon.com/kr/free-icons/"
                title="사람 아이콘"
              >
                <img src={leadership} />
                {/* 사람 아이콘 제작자: Gajah Mada - Flaticon */}
              </a>

              <span>{item.vote_count}</span>
              <span className="page-adult">
                {item.adult ? '청불' : 'Under 18'}
              </span>
            </div>
          </div>
        </StyleMoviePageCard>
      ))}
      <StylePagination>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={20}
          totalItemsCount={1000}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          // itemClass="page-item"
          linkClass="page-link"
        />
      </StylePagination>
    </div>
  );
};

export default MoviePagination;
