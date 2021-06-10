import React from 'react';
import styled from 'styled-components';
import Grid from './grid'
import routes from './routes'

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
          <div className='container'>
            {routes.map(({ path, exact, fetchInitialData, component: C }) => (
              <Route key={path} path={path} exact={exact}>
                <C
                  fetchInitialData={fetchInitialData}
                  repos={data}
                />
              </Route>
            ))}
          </div>
        </AppContainer>
    )
}

export default App;