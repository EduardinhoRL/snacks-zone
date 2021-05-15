import React, {useEffect, useState} from 'react';
import {useFetch} from '../hooks/useFetch'
import Product from '../components/Product'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-rows: 100px minmax(400px, 650px);
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
  grid-template-columns: 1fr 450px;
  width: 100%; 
`

const Cards = styled.div`
  overflow: hidden;
  width: 100%;
  max-height: 681px;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

const Form = styled.div`
  
`

function ProductsPage() {

  const { data, isLoading } = useFetch('products');

  if(isLoading) return <h1>cargando 🥵</h1>;

  return (
    <Container>
      <h2>Menu 🥶</h2>
      
      <Content>
        <Cards>
          {data.data.map(product => (
            <Product 
              key={product._id}
              product={product}
            />
          ))}
        </Cards>

        <Form>
          {'sadadsd'}
        </Form>

      </Content>
    </Container>
  );
}

export default ProductsPage;