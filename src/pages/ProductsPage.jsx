import React, {useEffect, useState} from 'react';
import {useFetch} from '../hooks/useFetch'
import {useForm} from '../hooks/useForm'

import Product from '../components/Product'
import NewProduct from '../components/NewProduct'
import styled from 'styled-components'
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
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
`

const Content = styled.div`
  width: 100%;
  border: 1px solid ${({theme}) => theme.color.border};
  border-radius: 20px;

  padding: 20px;
  display: grid;
  grid-template-columns: 969px 1fr;
  width: 100%; 
`

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
`

const FormS = styled.div`
  padding-left: 20px;

  h2 {
    margin-bottom: 20px;
  }
`
//////////////////////////////////////

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

function ProductsPage() {

  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal({_id, name, image, description, price}) {
    setIsOpen(true);
    setProductUpdateData({_id, name, image, description, price})
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
  }

  function closeModal(){
    setIsOpen(false);
  }

  const [productUpdateData, setProductUpdateData] = useState({});
  const [values, handleInputChanges] = useForm(productUpdateData);

  const { data, isLoading } = useFetch('products')

  if(isLoading) return <h1>cargando 🥵</h1>

  return (
    <Container>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <Form>
          <input type='hidden' name='_id' />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
          
        </Form>

        {/* Form */}
        

      </Modal>

      <h2>Menu 🥶</h2>  

      <Content>
        <Cards>
          {data.data.map(product => (
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
          <NewProduct />
        </FormS>

      </Content>
    </Container>
  );
}

export default ProductsPage;