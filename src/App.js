import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import './App.scss';

const Home = (lazy(() => import('./pages/Home')));
const BusyIndicator = (lazy(() => import('./components/BusyIndicator')));
const TopNav = (lazy(() => import('./components/TopNav')));

const routes = [{ path: '/', component: Home }];

const App = () => {
  const switchRoute = (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          exact
          {...route}
        />
      ))}
    </Switch>
  );

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<BusyIndicator />}>
          <TopNav></TopNav>
          <Container fluid className="main">
            {switchRoute}
          </Container>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
