import React from 'react';
import styled from 'styled-components';
import Grid from './grid'
import routes from './routes'
import { Navbar } from './Navbar'
import { NoMatch } from './NoMatch'
import { Switch, Route } from 'react-router-dom'

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
          <Navbar/>
            <Switch>
              {routes.map(({ path, exact, fetchInitialData, component: C }) => (
                <Route key={path} path={path} exact={exact} render={(props)=> (<C
                  fetchInitialData={fetchInitialData}
                  { ...props }
                />)} />
              ))}
              <Route path='*'>
                <NoMatch />
              </Route>
            </Switch>
          </div>
      </AppContainer>
    )
}

export default App;