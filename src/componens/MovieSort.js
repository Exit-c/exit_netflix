import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';

const StyleMovieSort = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;

  .sort-title {
    color: #fff;
    text-align: center;
  }
  .dropdown-menu {
    width: 280px;
    background-color: #000;
  }
  .dropdown-header {
    color: #ccc;
  }
  .dropdown-item {
    color: #fff;
  }
  .dropdown-item:hover {
    background-color: #dd3444;
  }
  .dropdown-item:focus {
    background-color: #dd3444;
  }
`;

const MovieSort = ({ setSortBy }) => {
  // Dropdown.Item Click이벤트
  const handleSortChange = (eventKey) => {
    setSortBy(eventKey);
  };
  return (
    <StyleMovieSort>
      <h3 className="sort-title">Sort</h3>
      <Dropdown.Menu show>
        <Dropdown.Header>Sort By</Dropdown.Header>
        <Dropdown.Item
          eventKey="2"
          onClick={() => handleSortChange('popularity.asc')}
        >
          Popularity(Asc)
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="3"
          onClick={() => handleSortChange('popularity.desc')}
        >
          Popularity(Desc)
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="4"
          onClick={() => handleSortChange('revenue.asc')}
        >
          Revenue(Asc)
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="5"
          onClick={() => handleSortChange('revenue.desc')}
        >
          Revenue(Desc)
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="6"
          onClick={() => handleSortChange('vote.asc')}
        >
          Vote(Asc)
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="7"
          onClick={() => handleSortChange('vote.desc')}
        >
          Vote(Desc)
        </Dropdown.Item>
      </Dropdown.Menu>
    </StyleMovieSort>
  );
};

export default MovieSort;
