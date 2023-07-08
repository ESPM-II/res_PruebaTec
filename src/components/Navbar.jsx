import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/assets.png';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background-color: #fff;
`;

const Logo = styled.img`
  height: 50px;
  width: 150px;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomNavLink = styled(NavLink)`
  margin-left: 20px;
  color: blue;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 25px;
  transition: color 0.3s ease;

  &.active {
    background-color: #ccc;
  }

  &:hover, &:focus, &:active {
    background-color: #ccc;
  }
`;

export const Navbar = () => {
  return (
    <Nav>
      <Logo src={logo} alt="Logo" />
      <NavLinks>
        <CustomNavLink exact to="/">
          Formulario
        </CustomNavLink>
        <CustomNavLink to="/data">
            Lista formulario
        </CustomNavLink>
      </NavLinks>
    </Nav>
  );
}

