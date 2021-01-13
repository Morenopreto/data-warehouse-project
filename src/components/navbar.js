import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './css/navbar.css'
// import { Button } from 'react-bootstrap'
// console.log(Navbar)

function NavbarComp() {

  return (
    <nav className='navbar'>
      <h4>OnlyGodKnows</h4>
      <ul className='navbarUl'>
        <li className='navbarLi'><NavLink className='navlinkLi' to={{ pathname: `/contacts` }}> Contactos </NavLink></li>
        <li className='navbarLi'><NavLink className='navlinkLi' to={{ pathname: `/users` }}> Usuarios</NavLink></li>
        <li className='navbarLi'><NavLink className='navlinkLi' to={{ pathname: `/companies` }}> Companias </NavLink></li>
        <li className='navbarLi'><NavLink className='navlinkLi' to={{ pathname: `/regions` }}> Regiones/Ciudades </NavLink></li>
      </ul >
      {/* <NavLink to={{ pathname: `/rrevisar` }}>Hola</NavLink> */}
      {/* <Navbar bg="primary" variant="dark"> */}
      {/* <Navbar.Brand>OnlyGodKnows</Navbar.Brand> */}
      {/* <Nav className="ml-auto"> */}
      {/* <Nav.Link >Contactos</Nav.Link> */}
      {/* <Nav.Link >Usuarios</Nav.Link> */}
      {/* <Nav.Link >Companias</Nav.Link> */}
      {/* <Nav.Link ></Nav.Link> */}
      {/* </Nav> */}
      {/* </Navbar> */}
    </nav >
  )

}
export default NavbarComp;


