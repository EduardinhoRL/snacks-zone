import React, {useEffect, useState} from 'react';
import styled from 'styled-components'

import Order from '../components/Order'

const Title = styled.h2`
  color: white;
  font: 700 25px poppins;
`

function OrdersPage() {

  const [orders, setOrdes] = useState([])

  // useEffect(() =>{
  //   fetch('https://7056f6b685e7.ngrok.io/products')
  //   .then((res) => res.json())
  //   .then((data) => setOrdes(data))

  //   console.log(orders);
  // }, [])

  return (
    <>
    <Title>Ordenes 🥶</Title>
      {/* {orders.map((order) => (
        <Order  />
      ))} */}
    </>
  );
}

export default OrdersPage;