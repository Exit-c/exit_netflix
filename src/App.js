import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Navigation from './componens/Navigation';

// 유저는 배너를 볼 수 있다.
// 유저는 가장 인기있는 영화 리스트, 가장 평점 좋은 영화 리스트, 상영 예정작 리스트를 볼 수 있다.
// 각각의 영화 리스트는 슬라이드 형태로 넘길 수 있다.
// 유저는 영화에 마우스를 올려두면 영화의 제목과 장르, 평점, 인기도, 청불여부를 볼 수 있다.
// 유저는 영화 카드를 클릭하면 영화의 상세 정보를 볼 수 있다.
// 상세 정보에는 포스터, 영화 제목, 평점, 인기도 청불여부, 줄거리 요약, 예산, 날짜, 시간, 리뷰, 예고편, 관련영화 등이 있다.
// 유저는 영화를 검색할 수 있다.
// 유저는 영화를 인기도순으로 정렬할 수 있다.
// 유저는 장르별로 영화를 필터링 할 수 있다.
// 유저는 영화 날짜별로 필터링 할 수 있다.

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
