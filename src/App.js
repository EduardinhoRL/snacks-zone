import React, { useReducer, useEffect } from 'react';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';
import { validateTokenCookie } from './auth/tokenCookie';
import { types } from './constants/types';
import { AppRouter } from './routes/AppRouter';

function App() {
	const [auth, dispatch] = useReducer(authReducer, { logged: false }, () => ({
		logged: false,
	}));

	const checkToken = () => {
		validateTokenCookie()
			.then((res) => {
				if (res) {
					const { token, username, firstName } = res;
					dispatch({
						type: types.login,
						payload: { user: { token, username, firstName } },
					});
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		checkToken();
	}, []);

	return (
		<AuthContext.Provider value={{ auth, dispatch }}>
			<AppRouter />
		</AuthContext.Provider>
	);
}

export default App;
