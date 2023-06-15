import React, { useState } from 'react';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';
import review from '../images/review.png';
import leadership from '../images/leadership.png';
import film from '../images/film.png';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';

const StyleDetailInfo = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 50px;
  display: flex;

  .info-img {
    width: 540px;
    height: 810px;
  }
  .movie-info {
    color: #fff;
    li:first-child {
      margin-bottom: 20px;
      .info-genre {
        margin-right: 10px;
      }
    }
    li:nth-child(2) {
      margin-bottom: 10px;
      h1 {
        font-size: 60px;
      }
    }
    li:nth-child(3) {
      font-size: 25px;
      margin-bottom: 20px;
    }
    li:nth-child(4) {
      font-size: 20px;
      margin-bottom: 20px;
      img {
        width: 25px;
        margin-right: 5px;
      }
      span {
        margin-right: 20px;
      }
    }
    .info-badge {
      margin-bottom: 10px;
      margin-right: 5px;
    }
    .info-trailer {
      position: relative;
      top: 3px;
      color: #dd3444;
      margin-left: 5px;
      font-size: 20px;
      cursor: pointer;
    }
    .info-trailer:hover {
      color: #fff;
    }
  }
`;

const MovieDetailInfo = ({ movie, video }) => {
  // 영화 예고편 상태관리
  const [show, setShow] = useState(false);
  // 영화 예고편 사이즈 및 옵션
  const opts = {
    height: '850',
    width: '1650',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <StyleDetailInfo>
      <div>
        <img
          className="info-img"
          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
          alt="poster image"
        />
      </div>
      <ul className="movie-info">
        <li>
          {movie?.genres.map((item, index) => (
            <Badge bg="danger" key={index} className="info-genre">
              {item.name}
            </Badge>
          ))}
        </li>
        <li>
          <h1>{movie?.title}</h1>
        </li>
        <li>{movie?.tagline}</li>
        <li>
          <a
            href="https://www.flaticon.com/kr/free-icons/-"
            title="고객 만족 아이콘"
          >
            {/* 고객 만족 아이콘 제작자: Freepik - Flaticon */}
            <img src={review} alt="review" />
          </a>
          <span>{movie?.vote_average}</span>
          <a href="https://www.flaticon.com/kr/free-icons/" title="사람 아이콘">
            <img src={leadership} alt="leadership" />
            {/* 사람 아이콘 제작자: Gajah Mada - Flaticon */}
          </a>
          <span>{movie?.vote_count}</span>
          <span>{movie?.adult ? '청불' : 'Under 18'}</span>
        </li>
        <li>
          <hr />
        </li>
        <li>
          <p>{movie?.overview}</p>
        </li>
        <li>
          <hr />
        </li>
        <li>
          <Badge bg="danger" className="info-badge">
            Budget
          </Badge>
          <span>${movie?.budget}</span>
        </li>
        <li>
          <Badge bg="danger" className="info-badge">
            Revenue
          </Badge>
          <span>${movie?.revenue}</span>
        </li>
        <li>
          <Badge bg="danger" className="info-badge">
            Release Day
          </Badge>
          <span>{movie?.release_date}</span>
        </li>
        <li>
          <Badge bg="danger" className="info-badge">
            Time
          </Badge>
          <span>{movie?.runtime}</span>
        </li>
        <li>
          <hr />
        </li>
        <li>
          <a href="https://www.flaticon.com/kr/free-icons/" title="필름 아이콘">
            {/* 아이콘 제작자: Pause08 - Flaticon */}
            <img src={film} alt="film" width={20} />
          </a>
          <span className="info-trailer" onClick={() => setShow(true)}>
            Watch Trailer
          </span>
        </li>
      </ul>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Trailer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {video && video.results.length > 0 && (
            <div>
              <YouTube videoId={video.results[0].key} opts={opts} />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </StyleDetailInfo>
  );
};

export default MovieDetailInfo;
