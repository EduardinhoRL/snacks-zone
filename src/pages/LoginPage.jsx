import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Container, FormGroup, Input, Button, Title } from '../components/FormComponents';
import { AuthContext } from '../auth/AuthContext';
import { useForm } from '../hooks/useForm';
import { types } from '../constants/types';

import Logo from '../img/logo.png'

export const LoginPage = () => {
	const { auth, dispatch } = useContext(AuthContext);
	const [values, handleInputChanges] = useForm({});
	const [error, setError] = useState({ error: false, message: '' });
	console.log(`${process.env.REACT_APP_API_URL}/users/auth`);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/auth`, values);
			const data = res.data;

			if (!data.error && data !== null) {
				dispatch({ type: types.login, payload: { ...data.data } });
				document.cookie = `token=${data.data.token}`;
			}
		} catch (e) {
			console.log(e);
			const { error, message } = e.response.data;
			// setError({ error, message });
		}
	};

	if (auth.logged) {
		return <Redirect to='/' />;
	}

	return (
		<Container>
			<img src={Logo} alt="" />
			<FormGroup onSubmit={handleSubmit}>
				<Title>Registrate</Title>
				<Input
					type='text'
					placeholder='usuario'
					name='username'
					onChange={handleInputChanges}
				/>
				<Input
					type='password'
					placeholder='contrasena'
					name='password'
					onChange={handleInputChanges}
				/>
				<Button type='submit'>Entrar</Button>
			</FormGroup>
		</Container>
	);
};
