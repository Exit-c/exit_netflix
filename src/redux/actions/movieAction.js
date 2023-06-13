import api from '../api';
import { movieActions } from '../reducers/movieReducer';

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
    try {
      dispatch(movieActions.getLoading());
      const popularMovieApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const topRatedMovieApi = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );

      const upcomingMovieApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      const genreApi = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en`
      );

      let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
        await Promise.all([
          popularMovieApi,
          topRatedMovieApi,
          upcomingMovieApi,
          genreApi,
        ]);

      dispatch(
        movieActions.getMovies({
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upcomingMovies: upcomingMovies.data,
          genreList: genreList.data.genres,
        })
      );
    } catch (error) {
      //에러 핸들링
      dispatch(movieActions.getMoviesFail());
    }
  };
}

export const movieAction = {
  getMovies,
};
