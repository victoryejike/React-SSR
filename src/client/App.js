import React from 'react';
import styled from 'styled-components';
import Grid from './grid'

// Our single Styled Component definition
const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 100%;
  min-height: 100%;
  font-size: 40px;
  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);
`;

const App = ({ data }) => {
    return (
        <AppContainer>
          <Grid repos={data}/>
        </AppContainer>
    )
}

export default App;