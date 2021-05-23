import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { LoginPage } from '../pages/LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {
	const { auth } = useContext(AuthContext);
	return (
		<Router>
			<div>
				<Switch>
					<Route path='/login'>
						<LoginPage />
					</Route>
					<PrivateRoute isAuth={auth.logged} component={DashboardRoutes} />
				</Switch>
			</div>
		</Router>
	);
};
