import React, { useState } from 'react';

import styled from 'styled-components';
import { getAuthCookie } from '../helpers/getCookie';

const Row = styled.div`
	padding: 10px 20px;
	border-radius: 10px;
	display: grid;
	grid-template-columns: repeat(5, 1fr);

	&:hover {
		background: ${({ theme }) => theme.color.border};
	}
`;

const PersonalInfo = styled.div`
	display: grid;
	grid-template-columns: 50px 200px;
	gap: 25px;
`;

const Avatar = styled.div`
	width: 50px;
	height: 50px;
	display: grid;
	place-items: center;
	border-radius: 99px;
	font: 600 16px poppins;
	color: white;
	background: ${({ theme }) => theme.color.primary};
`;
const Name = styled.div`
	color: white;
	font: 400 16px poppins;
	line-height: 25px;
`;

const Number = styled.div`
	color: #d6d6d6;
	font: 300 15px poppins;
	line-height: 25px;
`;

const Food = styled.div`
	display: flex;
	align-items: center;

	& > span {
		color: #d6d6d6;
		font-size: 30px;
	}

	button {
		position: relative;
		display: grid;
		place-items: center;
		color: #d6d6d6;
		border-radius: 3px;
		margin-left: 20px;
		background: ${({ theme }) => theme.color.bgPrimary};
		border: 1px solid ${({ theme }) => theme.color.border};
		cursor: pointer;

		&:focus-within div {
			opacity: 1;
			pointer-events: unset;
		}
	}
`;

const ListProducts = styled.div`
	position: absolute;
	width: 300px;
	top: 0px;
	left: 40px;
	border-radius: 10px;
	opacity: 0;
	transition: opacity 0.4s ease;
	pointer-events: none;
	z-index: 2;
	background: ${({ theme }) => theme.color.bgPrimary};
	border: 1px solid ${({ theme }) => theme.color.border};
	padding: 10px;

	& > div {
		display: grid;
		grid-template-columns: 20px 1fr 55px;
		gap: 10px;
		padding: 10px;

		&:hover {
			background: ${({ theme }) => theme.color.border};
			border-radius: 5px;
		}
	}
`;

const Fecha = styled.div`
	display: grid;
	place-items: center;
	color: white;
	font: 400 16px poppins;

	div {
		display: flex;
		align-items: center;
	}

	span {
		margin-right: 10px;
		color: #d6d6d6;
	}
`;

const Price = styled.div`
	display: grid;
	place-items: center;
	font: 500 16px poppins;

	span {
		background: rgba(253, 122, 56, 0.4);
		padding: 4px 8px;
		border-radius: 3px;
		color: ${({ theme }) => theme.color.primary};
	}
`;

const NameP = styled(Name)`
	display: flex;
	align-items: center;
`;

const Quantity = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font: 500 16px poppins;
	color: ${({ theme }) => theme.color.primary};
`;

const Checkbox = styled.div`
	display: grid;
	place-items: center;
`;
const BtnCompleted = styled.button`
	background: ${({ theme }) => theme.color.bgPrimary};
	border: 1px solid ${(props) => (props.completado ? '#fd7a38' : '#d6d6d6')};
	padding: 5px 10px;
	color: ${(props) => (props.completado ? '#fd7a38' : '#d6d6d6')};
	border-radius: 5px;
	font: 400 15px poppins;
	cursor: pointer;
`;

function Order({ order, setChange }) {
	const {
		_id,
		clientName,
		clientPhoneNumber,
		createdAt,
		completedAt,
		isCompleted,
		products,
		total,
	} = order;
	const [completed, setCompleted] = useState(isCompleted);

	const fecha = createdAt.split('T');
	const hora = fecha[1].split('.');

	const handleClick = (e) => {
		order.isCompleted = !isCompleted;
		order.completedAt = Date.now();

		console.log(order.isCompleted);
		putData(`${process.env.REACT_APP_API_URL}/orders/${_id}`, order).then(() => {
			setCompleted(!completed);
			setChange((value) => !value);
		});
	};

	async function putData(url, data) {
		// Opciones por defecto estan marcadas con un *
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',

				'auth-token': getAuthCookie(),
			},
			method: 'PUT', // *GET, POST, PUT, DELETE, etc.
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}

	return (
		<Row>
			<PersonalInfo>
				<Avatar>{clientName.charAt(0)}</Avatar>
				<div>
					<Name>{clientName}</Name>
					<Number>{clientPhoneNumber}</Number>
				</div>
			</PersonalInfo>

			<Food>
				<span className='material-icons'>fastfood</span>
				<button>
					<span className='material-icons'>chevron_right</span>

					<ListProducts>
						{products.map((product) => (
							<div key={product._id}>
								<Quantity>{product.qty}</Quantity>
								<NameP>{product.productName}</NameP>
								<Price>
									<span>${product.total}</span>
								</Price>
							</div>
						))}
					</ListProducts>
				</button>
			</Food>

			<Price>
				<span>${total}</span>
			</Price>

			<Fecha>
				<div>
					<span className='material-icons'>pending_actions</span> {fecha[0]} /{' '}
					{hora[0]}
				</div>
			</Fecha>

			<Checkbox>
				<BtnCompleted
					onClick={handleClick}
					className={isCompleted ? 'completed' : null}
				>
					{isCompleted ? 'Completado' : 'Incompleto'}{' '}
				</BtnCompleted>
			</Checkbox>
		</Row>
	);
}

export default Order;
