import React, {useState} from 'react';
import {useFetch} from '../hooks/useFetch'

import styled from 'styled-components'

const Form = styled.form`
  width: 100%;
  display: grid;
  gap: 10px;

  * {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${({theme}) => theme.color.border};
    background: rgba(0, 0, 0, .1);
    color: white;
    font: 300 14px poppins;
  }

  button {
    background: ${({theme}) => theme.color.primary};
    font: 600 18px poppins;
    cursor: pointer;
    color: rgba(0, 0, 0, .8);
    transition: opacity 0.4s ease;

    &:hover {
      opacity: .8;
      color: rgba(0, 0, 0, 1);
    }
  }

  textarea {
    resize: none;
  }
`

const Error = styled.span`
  background: #fd474775;
  border: 1px solid #ce4a4a;
  text-align: center;
`  

function NewProduct({handleRefresh}) {

  const [product, setProduct] = useState({
    name: '',
		price: '',
		description: '',
		image: '',
  })

  const [error, setError] = useState(false)

  const {name, price, description, image} = product


  const handleChange = e => {
    setProduct({
      ...product, 
      [e.target.name]: e.target.value
    })
  }

  async function postData(url, data) {
		// Opciones por defecto estan marcadas con un *
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}

  const reset = () => {
    setProduct({
      name: '',
      price: '',
      description: '',
      image: ''
    })
}

  const handleSubmit = (e) => {
		e.preventDefault();

    if (
			name.trim() === '' ||
			price.trim() === '' ||
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
    
    postData(`${process.env.REACT_APP_API_URL}/products`, product)
    .then(() => handleRefresh())
    reset()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input type="text" placeholder="nombre" name='name' onChange={handleChange} value={name}/>
      <input type="number" placeholder="precio"  name='price' onChange={handleChange} value={price}/>
      <textarea name="" id="" cols="30" rows="10" placeholder="descripcion" name='description' onChange={handleChange} value={description}></textarea>
      <input type="text" placeholder="url imagen"  name='image' onChange={handleChange} value={image}/>
      {error ? <Error className>completa todos los campos</Error> : null}
      <button>
        Agregar
      </button>
    </Form>
  );
}

export default NewProduct;