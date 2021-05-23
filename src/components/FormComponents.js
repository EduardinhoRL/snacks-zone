import styled from 'styled-components';
import bg from '../assets/img/bg.jpg';

export const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column; 
	align-items: center;
	background: url('https://i.imgur.com/vhbbMDh.jpg');
	background-size: cover;

	img {
		width: calc(250px + 3vw);
		margin: 40px 0 20px 0;
		filter: drop-shadow(0 0 15px rgba(0,0,0, .8));
	}
`;

export const FormGroup = styled.form`
	display: grid;
	gap: 25px;
	width: 500px;
	margin: 0px auto;
	border-radius: 20px;
	padding: 40px;
	background: rgb(22 22 25 / 50%);
  backdrop-filter: blur(20px);
	box-shadow: ${({ theme }) => theme.shadow.primary};
`;

export const Title = styled.h2`
	color: #fff;
	font: 600 30px poppins;
`;

export const Input = styled.input`
	width: 100%;
	padding: 15px 20px;
	color: #fff;
	background: rgb(22 22 25 / 40%);
	font: 600 14px poppins;
	transition: background 0.3s ease;
	border: none;
	border-radius: 12px;
	outline: none;

	&::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}

	&:focus {
		background: ${({ theme }) => theme.color.theme};
	}
`;

export const Button = styled.button`
	width: 100%;
	padding: 10px 20px;

	font: bold 16px Poppins;
	background: ${({ theme }) => theme.color.primary};
	color: white;
	transition: transform 0.3s ease;

	border: none;
	border-radius: 12px;
	cursor: pointer;
	outline: none;
	

	&:hover {
		transform: translateY(-4px);
	}
`;
