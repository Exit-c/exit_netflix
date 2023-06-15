import React from 'react';
import { useSelector } from 'react-redux';
import ReactSlider from 'react-slider';
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

  // Badge 스타일변경
  .badge {
    height: 35px;
    line-height: 25px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

// react-slider 스타일 컴포넌트
const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 10px;
`;
const StyledThumb = styled.div`
  height: 20px;
  width: 20px;
  text-align: center;
  background-color: #dd3444;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  top: -5px;
`;
const Thumb = (props, state) => <StyledThumb {...props}></StyledThumb>;
const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? '#ddd' : props.index === 1 ? '#dd3444' : '#ddd'};
  border-radius: 999px;
`;
const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

// 여기까지 react-slider 스타일 컴포넌트

const MovieFilter = ({ year, setYear, ratings, setRatings, setGenres }) => {
  const { genreList } = useSelector((state) => state.movie);

  //년도 onChange이벤트
  const handleChangeYear = (newYear) => {
    setYear(newYear);
  };
  //평점 onChange이벤트
  const handleChangeRatings = (newRatings) => {
    // ratings의 초기 state값은 객체형태이고, StyleSlider의 value값은 배열형태여서 setRatings를 객체형태로 변환해서 값을 줘야함.
    setRatings({
      min: newRatings[0],
      max: newRatings[1],
    });
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
          From: {year[0]} - To: {year[1]}
        </span>
        <StyledSlider
          renderTrack={Track}
          renderThumb={Thumb}
          max={new Date().getFullYear()}
          min={1990}
          value={[year[0], year[1]]}
          onChange={handleChangeYear}
        />
      </div>
      <div>
        <h4 className="filter-ratings">Ratings Filter</h4>
        <span className="filter-yearBy">
          From: {ratings.min} - To: {ratings.max}
        </span>
        <StyledSlider
          renderTrack={Track}
          renderThumb={Thumb}
          max={10}
          min={0}
          value={[ratings.min, ratings.max]}
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
