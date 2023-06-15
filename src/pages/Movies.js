import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MoviePagination from '../componens/MoviePagination';
import MovieSort from '../componens/MovieSort';
import MovieFilter from '../componens/MovieFilter';
import api from '../redux/api';
import { movieActions } from '../redux/reducers/movieReducer';

const StyleMoviesContainer = styled.div`
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
  .sortFilter-container {
    width: 300px;
    float: left;
  }
  .pagination-container {
    width: 900px;
    float: right;
    padding-left: 60px;
  }
`;
// TMDB API키 값
const API_KEY = process.env.REACT_APP_API_KEY;

const Movies = () => {
  // 영화정보 페이지 상태관리
  const [activePage, setActivePage] = useState(1);

  // 영화 정보를 담을 상태관리
  const [movies, setMovies] = useState([]);

  // 영화 정렬 상태관리
  const [sortBy, setSortBy] = useState('popularity.desc');

  // 영화 년도별 필터 상태관리
  const [year, setYear] = useState([1990, new Date().getFullYear()]); //ratings와 다르게 배열로 담아서 작업해봄.

  // 영화 평점 필터 상태관리
  const [ratings, setRatings] = useState({
    min: 0,
    max: 10,
  });

  // 영화 장르 필터 상태관리
  const [genres, setGenres] = useState('');

  const dispatch = useDispatch();

  // 검색어 호출
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');

  // npm pagination 이벤트
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response;
        if (searchQuery) {
          response = await api.get(
            `/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${activePage}`
          );
        } else {
          let url = `/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}&page=${activePage}&vote_average.gte=${ratings.min}&vote_average.lte=${ratings.max}&with_genres=${genres}`;
          // 년도별 필터링을 더 정확하게 하기 위해 조건문 추가
          if (year[0] && year[1]) {
            url += `&primary_release_date.gte=${year[0]}-01-01&primary_release_date.lte=${year[1]}-12-31`;
          }

          response = await api.get(url);
        }
        const data = response.data.results;
        setMovies(data);
      } catch (error) {
        console.log('Error fetching movies:', error);
        dispatch(movieActions.getMoviesFail());
      }
    };

    fetchMovies();
  }, [activePage, searchQuery, sortBy, year, ratings, genres]);

  return (
    <div style={{ backgroundColor: '#000' }}>
      <StyleMoviesContainer>
        <div className="sortFilter-container">
          <MovieSort setSortBy={setSortBy} />
          <MovieFilter
            setYear={setYear}
            year={year}
            ratings={ratings}
            setRatings={setRatings}
            setGenres={setGenres}
          />
        </div>
        <div className="pagination-container">
          <MoviePagination
            movies={movies}
            activePage={activePage}
            handlePageChange={handlePageChange}
          />
        </div>
      </StyleMoviesContainer>
    </div>
  );
};

export default Movies;
