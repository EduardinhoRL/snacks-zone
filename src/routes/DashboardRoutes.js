import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../components/Nav';
import styled from 'styled-components';
import { AuthContext } from '../auth/AuthContext';
import OrdersPage from '../pages/OrdersPage';
import ProductsPage from '../pages/ProductsPage';

const Container = styled.div`
	height: 100vh;
	display: grid;
	grid-template-columns: 300px 1fr;
`;

export const DashboardRoutes = () => {
	return (
		<>
			<Container>
				<Nav />
				<Switch>
					<Route exact path='/' component={OrdersPage} />
					<Route exact path='/menu' component={ProductsPage} />
				</Switch>
			</Container>
		</>
	);
};
