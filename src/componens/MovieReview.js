import React from 'react';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';

const StyleReview = styled.div`
  color: #fff;
  position: relative;
  .review-title {
    display: inline-block;
    margin-right: 5px;
  }
  .review-badge {
    position: absolute;
    top: 9px;
  }
  .review-author {
    font-size: 20px;
  }
  .review-content {
    margin-bottom: 15px;
  }
`;

const MovieReview = ({ review }) => {
  return (
    <StyleReview>
      <h3 className="review-title">Reviews</h3>
      <Badge bg="secondary" className="review-badge">
        {review?.total_results}
      </Badge>

      {review?.results.map((item, index) => (
        <div key={index}>
          <div className="review-author">- {item?.author}</div>
          <p className="review-content">{item?.content}</p>
        </div>
      ))}
    </StyleReview>
  );
};

export default MovieReview;
