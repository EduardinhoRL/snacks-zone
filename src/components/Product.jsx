import React from 'react';

import styled from 'styled-components'

const Card = styled.div`
  width: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  border: 1px solid ${({theme}) => theme.color.border};
  border-radius: 10px;

  img {
    width: 100%;
  }
`
const ContainerImg = styled.div`
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;

  position: relative;
`

const Options = styled.button`
  position: absolute;
  display: grid;
  place-items: center;
  right: 5px;
  bottom: 5px;
  border: none;
  border-radius: 20px;
  background: none;
  cursor: pointer;
  padding: 5px;
  color: white;
  background: ${({theme}) => theme.color.bgPrimary};

  span {
    font-size: 20px;
  }

  &:focus-within div {
    opacity: 1;
    pointer-events: unset;
  }

  div {
    width: 110px;
    height: 55px;
    
    position: absolute;
    top: -60px;
    right: 0;

    background: ${({theme}) => theme.color.bgPrimary};
    border: 1px solid ${({theme}) => theme.color.border};
    border-radius: 10px;
    opacity: 0;
    pointer-events: none;

    transition: opacity .3s ease;
    display: grid;
    gap: 7px;
    padding: 7px;
    grid-template-columns: 1fr 1fr;

    button {
      cursor: pointer;
      border-radius: 3px;
      border: none;
      color: rgba(0, 0, 0, .6);
    }
    button:nth-child(1) {
      background: #5f87f5;
    }
    button:nth-child(2) {
      background: #e45c5c;
    }
  }
`

const ContainerInfo = styled.div`
 
  p {
    margin: 10px;
  }

  p:nth-child(1) {
    font: 600 20px poppins;
    color: white;
    text-transform: capitalize;
  }

  p:nth-child(2) {
    font: 400 16px poppins;
    color: ${({theme}) => theme.color.primary};
  }

  p:nth-child(3) {
    padding: 5px 8px;
    font: 400 14px poppins;
    color: white;
    background: rgba(255, 255, 255, .05);
    border-radius: 3px;
  }

  & > div {
    margin: 10px;
    font: 600  16px poppins;
    color: white;
    padding: 5px;
    background: ${({theme}) => theme.color.primary};
    width: 66px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 7px;
  }
` 

function Product({product, openModal, setProductUpdateData}) {

  const {_id, name, image, description, price} = product

  const handleDelete = (e) => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${_id}`, { method: 'DELETE' })
      .then(() => console.log('bingo'))
			.catch((error) => console.log(error));
	};

  return (
    <Card>
      <ContainerImg>
        <img loading='lazy' src={image} alt="" />
        <Options>
          <span className="material-icons">tune</span>
          <div>
            <button onClick={()=> openModal(product)}><span className="material-icons">mode_edit</span></button>
            <button onClick={handleDelete}><span className="material-icons">delete</span></button>
          </div>
        </Options>
      </ContainerImg>
      <ContainerInfo>
        <p>{name}</p>
        <p>${price} MXN</p>
        <p>{description}</p>
      </ContainerInfo>
    </Card>
  );
}

export default Product;