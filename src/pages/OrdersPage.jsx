import React, { useEffect, useState, useRef } from 'react';
import { useFetch } from '../hooks/useFetch';

import socketIOClient from 'socket.io-client';

import styled from 'styled-components';

import Order from '../components/Order';

const Container = styled.div`
	display: grid;
	grid-template-rows: 100px 50px minmax(400px, 680px);
	gap: 20px;
	padding: 50px;
	padding-top: 20px;

	h2 {
		display: grid;
		place-items: center;
	}
`;

const Table = styled.div`
	/* display: flex;
  flex-direction: column-reverse; */

	display: grid;
	gap: 20px;
	grid-template-rows: repeat(auto-fill, 75px);
	overflow: hidden;
	width: 100%;
	max-height: 700px !important;
	overflow-y: scroll;
	padding-right: 30px;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background: #424244;
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: #5b5b5d;
	}
`;

const Select = styled.select`
	border: 1px solid ${({ theme }) => theme.color.border};
	background: ${({ theme }) => theme.color.bgPrimary};
	border-radius: 10px;
	color: white;
	padding: 10px;
`;

function OrdersPage() {
	const [state, handleRefresh] = useFetch('orders');

	//const [filtro, setFiltro] = useState('all')

	const [filtro, setFiltro] = useState([]);
	const [category, setCategory] = useState('');

	const [change, setChange] = useState(false);

	const { data, isLoading } = state;

	useEffect(() => {
		if (isLoading === false) {
			setFiltro(data.data);
		}
		const socket = socketIOClient(process.env.REACT_APP_API_URL);
		socket.on('NEW ORDER', (order) => {
			handleRefresh();
		});
	}, []);

	useEffect(() => {
		if (isLoading === false) {
			if (category === 'incompleted') {
				setFiltro(data.data.filter((order) => order.isCompleted === false));
			} else if (category === 'completed') {
				setFiltro(data.data.filter((order) => order.isCompleted === true));
			} else {
				setFiltro(data.data);
			}
		}
	}, [data, category, change, state]);

	const handleChange = (e) => {
		//setFiltro(e.target.value)
		setCategory(e.target.value);
	};

	if (isLoading) return <h1>cargando 🥵</h1>;

	return (
		<Container>
			<h2>Ordenes 🥶</h2>

			<Select onChange={handleChange}>
				<option value='all'>Todos</option>
				<option value='completed'>Completado</option>
				<option value='incompleted'>Incompleto</option>
			</Select>

			<Table>
				{filtro.map((order) => (
					<Order
						key={order._id}
						order={order}
						handleRefresh={handleRefresh}
						setChange={setChange}
					/>
				))}
			</Table>
		</Container>
	);
}

export default OrdersPage;
