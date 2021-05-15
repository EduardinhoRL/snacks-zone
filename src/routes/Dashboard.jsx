import React from 'react';

import Nav from '../components/Nav'
import Header from '../components/Header'
import OrdersPage from '../pages/OrdersPage'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
`

const Content = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  background: ${({theme}) => theme.color.bgPrimary};
`

function DashboardRoutes() {
  return (
    <Router>
      <Container>
        <Nav />

        <Content>
          <Header />
          <Switch>
            <Route exact path='/' component={OrdersPage} /> 
          </Switch>
        </Content>
      </Container>
    </Router>
  );
}

export default DashboardRoutes;