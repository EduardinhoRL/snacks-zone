import React from 'react';
import Logo from '../img/logo.png'

import {NavLink} from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  gap: 50px;
  grid-template-rows: 200px 160px;
  background: ${({theme}) => theme.color.bgPrimary};
  border-right: 1.5px solid ${({theme}) => theme.color.border};
`

const LogoS = styled.div`
  display: grid;
  place-items: center;

  img {
    width: 150px;
  }
`
const NavS = styled.nav`
  display:  grid;

  a {
    font: 500 16px 'poppins';
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    padding-left: 40px;
    transition: background 0.4s ease;
    margin: 10px 20px;
    border-radius: 10px;

    &:hover {
      background: ${({theme}) => theme.color.primary};
    }

    span {
      margin-right: 20px;
    }
  }
`

const BtnCotainer = styled.div`
  display: flex;
  align-items: flex-end;
`

const BtnLogout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font: normal 16px poppins;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.color.border};
  color: white;
  background: none;
  cursor: pointer;
  transition: background 0.4s ease;
  min-height: 110px;
  width: 100%;
  margin: 40px;

  &:hover {
    background: ${({theme}) => theme.color.primary50};
  }

  span {
    margin-right: 10px;
  }
`

function Nav({}) {
  return (
    <Container>
      <LogoS>
        <img src={Logo} />
      </LogoS>
      <NavS>
        <NavLink activeClassName="activeLink" exact to="/"><span className="material-icons">room_service</span> Ordenes</NavLink>
        <NavLink activeClassName="activeLink" exact to="/menu"><span className="material-icons">restaurant_menu</span> Menu</NavLink>
      </NavS>

      <BtnCotainer>
        <BtnLogout><span className="material-icons">login</span> Salir</BtnLogout>
      </BtnCotainer>
    </Container>
  );
}

export default Nav;