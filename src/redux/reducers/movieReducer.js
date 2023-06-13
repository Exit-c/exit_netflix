import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  genreList: [],
  loading: true,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    getLoading(state) {
      state.loading = true;
    },
    getMovies(state, action) {
      state.popularMovies = action.payload.popularMovies;
      state.topRatedMovies = action.payload.topRatedMovies;
      state.upcomingMovies = action.payload.upcomingMovies;
      state.genreList = action.payload.genreList;
      state.loading = false;
    },
    getMoviesFail(state) {
      state.loading = false;
    },
  },
});
export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
