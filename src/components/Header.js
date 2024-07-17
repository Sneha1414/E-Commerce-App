import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';

const Header = ({ userName}) => {
  return(
    <MainHeader>
        <NavLink to="/">
            <img src="./images/logo1.jpeg" alt='my logo img' className="logo"/>
        </NavLink>
         <Nav>
          {userName ? (
            <span>Welcome, {userName}</span>
          ) : (
            <NavLink to="/">Register</NavLink>
          )}
         </Nav>
    </MainHeader>
  );
};

const MainHeader = styled.header`
    padding: 0 4.9rem;
    height: 11rem;
    background-color: ${({ theme }) => theme.colors.bg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .logo{
        height: 90px;
        width: 90px;
        
    }
`;

export default Header;

