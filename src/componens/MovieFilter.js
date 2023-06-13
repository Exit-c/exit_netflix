import React from 'react';
import { useSelector } from 'react-redux';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';

const StyleMovieFilter = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;

  .filter-title {
    text-align: center;
    color: #fff;
  }
  .filter-year {
    color: #ccc;
    font-size: 14px;
    text-indent: 19px;
    margin-bottom: 10px;
  }
  .filter-yearBy {
    display: block;
    color: #fff;
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }

  .filter-ratings,
  .filter-genres {
    color: #ccc;
    font-size: 14px;
    text-indent: 19px;
    margin-top: 20px;
  }
  .genres-container {
    overflow: hidden;
    padding: 20px;
  }

  // InputRange 스타일변경
  .input-range {
    margin: 0 auto;
    width: 230px;
  }
  .input-range__label-container {
    display: none;
  }
  .input-range__track--active {
    background: #dd3444;
  }
  .input-range__slider {
    background: #dd3444;
    border: #dd3444;
  }

  // Badge 스타일변경
  .badge {
    height: 35px;
    line-height: 25px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

const MovieFilter = ({ year, setYear, ratings, setRatings, setGenres }) => {
  const { genreList } = useSelector((state) => state.movie);

  //년도 onChange이벤트
  const handleChangeYear = (newYear) => {
    setYear(newYear);
  };
  //평점 onChange이벤트
  const handleChangeRatings = (newRatings) => {
    setRatings(newRatings);
  };
  //장르 onClick이벤트
  const handleClickGenre = (genre) => {
    setGenres(genre);
  };

  return (
    <StyleMovieFilter>
      <div>
        <h3 className="filter-title">Filter</h3>
        <h4 className="filter-year">Year Filter</h4>
        <span className="filter-yearBy">
          From: {year.min} - To: {year.max}
        </span>
        <InputRange
          maxValue={new Date().getFullYear()}
          minValue={1990}
          value={year}
          onChange={handleChangeYear}
        />
      </div>
      <div>
        <h4 className="filter-ratings">Ratings Filter</h4>
        <span className="filter-yearBy">
          From: {ratings.min} - To: {ratings.max}
        </span>
        <InputRange
          maxValue={10}
          minValue={0}
          value={ratings}
          onChange={handleChangeRatings}
        />
      </div>
      <div>
        <h4 className="filter-genres">Genres Filter</h4>
        <div className="genres-container">
          {genreList.map((item, index) => (
            <Badge
              bg="danger"
              key={index}
              onClick={() => handleClickGenre(item.id)}
            >
              {item.name}
            </Badge>
          ))}
        </div>
      </div>
    </StyleMovieFilter>
  );
};

export default MovieFilter;
