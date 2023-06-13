import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import api from '../redux/api';
import styled from 'styled-components';
import MovieDetailInfo from '../componens/MovieDetailInfo';
import MovieReview from '../componens/MovieReview';
import MovieRecommendation from '../componens/MovieRecommendation';
import { movieActions } from '../redux/reducers/movieReducer';

const StyleBg = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyleMovieDetail = styled.div`
  background-color: #000;
  overflow: hidden;
  .container {
    width: 1200px;
    margin: 0 auto;
  }
`;

const MovieDetail = () => {
  const loading = useSelector((state) => state.movie.loading);
  // 현재 페이지 id값 가져오기
  const { id } = useParams();
  const API_KEY = process.env.REACT_APP_API_KEY;
  // 영화 정보 상태 관리
  const [movie, setMovie] = useState(null);
  // 영화 리뷰 상태 관리
  const [review, setReview] = useState(null);
  // 영화 추천 상태 관리
  const [recommendation, setRecommendation] = useState(null);
  // 영화 트레일러 상태 관리
  const [video, setVideo] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        // 로딩스피너 호출
        dispatch(movieActions.getLoading());
        const movieApi = api.get(
          `/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const movieReviewApi = api.get(
          `/movie/${id}/reviews?api_key=${API_KEY}`
        );
        const movieRecommendationApi = api.get(
          `/movie/${id}/recommendations?api_key=${API_KEY}`
        );
        const movieVideoApi = api.get(`/movie/${id}/videos?api_key=${API_KEY}`);

        let [movies, movieReviews, movieRecomendations, movieVideo] =
          await Promise.all([
            movieApi,
            movieReviewApi,
            movieRecommendationApi,
            movieVideoApi,
          ]);
        setMovie(movies.data);
        setReview(movieReviews.data);
        setRecommendation(movieRecomendations.data);
        setVideo(movieVideo.data);
        // 로딩스피너 종료
        dispatch(movieActions.getMoviesFail());
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <StyleBg>
        <ClipLoader color="red" loading={loading} size={150} />
      </StyleBg>
    );
  }
  return (
    <StyleMovieDetail>
      <div className="container">
        <MovieDetailInfo movie={movie} video={video} />
        <MovieReview review={review} />
        <MovieRecommendation recommendation={recommendation} />
      </div>
    </StyleMovieDetail>
  );
};

export default MovieDetail;
