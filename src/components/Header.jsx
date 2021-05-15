import React, {useEffect, useState} from 'react';

import styled from 'styled-components'

const HeaderS = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  border-bottom: 1px solid ${({theme}) => theme.color.border};

  h1 {
    font: 700 35px poppins;
    color: white;
  }

`

const F = styled.span`
  font: 700 30px 'Source Code Pro';
  color: white;
`

function Header() {

  const [date, setDate] = useState()

  useEffect(() => {
    const todayIs = () => {
      const today = new Date()
      const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
      const f = (`${today.getDate()}-${months[today.getMonth()]}-${today.getFullYear()}`);
      setDate(f)
    }
    todayIs()
  }, [])

  return (
    <HeaderS>
      <h1>Hola, Eduardo</h1>
      <F>{date}</F>
    </HeaderS>
  );
}

export default Header;