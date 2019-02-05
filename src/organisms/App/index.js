import React, { Component } from 'react';
import Routes from '../../Routes';
import styled from 'styled-components';
import bgimg from '../../sfdowntown.jpg';

const StyledContainer = styled.div`
  height: calc(100vh - 50px);
  color: black;

  &::after {
    content: '';
    background: url(${bgimg});
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    opacity: 0.3;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    z-index: -1;
  }
`;

class App extends Component {
  render() {
    return (
      <StyledContainer className="App">
        <Routes />
      </StyledContainer>
    );
  }
}

export default App;
