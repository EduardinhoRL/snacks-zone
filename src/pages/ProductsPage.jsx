import React, { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useForm } from '../hooks/useForm';

import Product from '../components/Product';
import NewProduct from '../components/NewProduct';
import styled from 'styled-components';
import Modal from 'react-modal';
import { getAuthCookie } from '../helpers/getCookie';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		background: '#161619',
		border: '1px solid #32323a',
		'border-radius': '15px',
	},
};

const Container = styled.div`
	display: grid;
	grid-template-rows: 100px minmax(400px, 640px);
	gap: 20px;
	padding: 50px;
	padding-top: 20px;

	h2 {
		display: grid;
		place-items: center;
	}
`;

const Content = styled.div`
	width: 100%;
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: 20px;
	padding: 20px;
	display: grid;
	grid-template-columns: 2fr 1fr;
	width: 100%;
`;

const Cards = styled.div`
	overflow: hidden;
	width: 100%;
	max-height: 681px;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;

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

const FormS = styled.div`
	padding-left: 20px;

	h2 {
		margin-bottom: 20px;
	}
`;
//////////////////////////////////////

const Form = styled.form`
	width: 400px;
	display: grid;
	gap: 10px;

	* {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid ${({ theme }) => theme.color.border};
		background: rgba(0, 0, 0, 0.1);
		color: white;
		font: 300 14px poppins;
	}

	button {
		background: ${({ theme }) => theme.color.primary};
		font: 600 18px poppins;
		cursor: pointer;
		color: rgba(0, 0, 0, 0.8);
		transition: opacity 0.4s ease;

		&:hover {
			opacity: 0.8;
			color: rgba(0, 0, 0, 1);
		}
	}

	textarea {
		resize: none;
	}
`;

const Error = styled.span`
	background: #fd474775;
	border: 1px solid #ce4a4a;
	text-align: center;
`;

const BtnClose = styled.button`
	background: #fd474775;
	border: 1px solid #ce4a4a;
	color: #d06464;
	text-align: center;
	margin-bottom: 20px;
	border-radius: 5px;
	cursor: pointer;
`;

function ProductsPage() {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [productUpdateData, setProductUpdateData] = useState({});
	const [error, setError] = useState(false);
	function openModal({ _id, name, image, description, price }) {
		setIsOpen(true);
		setProductUpdateData({ _id, name, image, description, price });
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
	}

	function closeModal() {
		setIsOpen(false);
	}

	const handleChange = (e) => {
		setProductUpdateData({
			...productUpdateData,
			[e.target.name]: e.target.value,
		});
	};

	const { name, image, description, price } = productUpdateData;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(price);
		if (
			name.trim() === '' ||
			price.length === 0 ||
			description.trim() === '' ||
			image.trim() === ''
		) {
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 2000);
			return;
		}
		setError(false);
		console.log(productUpdateData._id);
		putData(
			`${process.env.REACT_APP_API_URL}/products/${productUpdateData._id}`,
			productUpdateData
		).then(() => handleRefresh());
		setIsOpen(false);
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

	const [state, handleRefresh] = useFetch('products');

	const { data, isLoading } = state;

	console.log(state, handleRefresh, 'holaaaaaaaaaaaaa');

	if (isLoading) return <h1>cargando 🥵</h1>;

	return (
		<Container>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel='Example Modal'
			>
				<BtnClose onClick={closeModal}>
					<span class='material-icons'>close</span>
				</BtnClose>
				{/* _id, name, image, description, price */}
				<Form onSubmit={handleSubmit}>
					<input type='hidden' name='_id' value={productUpdateData._id} />
					<input
						type='text'
						placeholder='nombre'
						name='name'
						onChange={handleChange}
						value={productUpdateData.name}
					/>
					<input
						type='number'
						placeholder='precio'
						name='price'
						onChange={handleChange}
						value={productUpdateData.price}
					/>
					<textarea
						name=''
						id=''
						cols='30'
						rows='10'
						placeholder='description'
						name='description'
						onChange={handleChange}
						value={productUpdateData.description}
					></textarea>
					<input
						type='text'
						placeholder='url imagen'
						name='image'
						onChange={handleChange}
						value={productUpdateData.image}
					/>
					{error ? <Error>completa todos los campos</Error> : null}
					<button>Modificar</button>
				</Form>

				{/* Form */}
			</Modal>

			<h2>Menu 🥶</h2>

			<Content>
				<Cards>
					{data.data.map((product) => (
						<Product
							key={product._id}
							product={product}
							openModal={openModal}
							setProductUpdateData={setProductUpdateData}
						/>
					))}
				</Cards>

				<FormS>
					<h2>Agregar nuevo Producto</h2>
					<NewProduct handleRefresh={handleRefresh} />
				</FormS>
			</Content>
		</Container>
	);
}

export default ProductsPage;
