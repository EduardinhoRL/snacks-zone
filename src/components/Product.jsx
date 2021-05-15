import React from 'react';

import styled from 'styled-components'

const Card = styled.div`


  img {
    width: 100%;
  }

`

function Product({product}) {

  const {name, image, description, price} = product

  return (
    <Card>
      <img loading='lazy' src={image} alt="" />
    </Card>
  );
}

export default Product;