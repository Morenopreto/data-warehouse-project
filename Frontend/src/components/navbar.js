import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/navbar.css'

function NavbarComp({userAdmin}) {

  return (
    <nav className='navbar'>
      <h4>OnlyGodKnows</h4>
      <ul className='navbarUl'>
        <li className='navbarLi'><NavLink activeClassName="act-navlinkLi" className='navlinkLi' to={{ pathname: `/contacts` }}> Contactos </NavLink></li>
        {(userAdmin) ? <li className='navbarLi'><NavLink activeClassName="act-navlinkLi" className='navlinkLi' to={{ pathname: `/users` }}> Usuarios</NavLink></li> : null}
        <li className='navbarLi'><NavLink activeClassName="act-navlinkLi" className='navlinkLi' to={{ pathname: `/companies` }}> Companias </NavLink></li>
        <li className='navbarLi'><NavLink activeClassName="act-navlinkLi" className='navlinkLi' to={{ pathname: `/regions` }}> Regiones/Ciudades </NavLink></li>
      </ul >
    </nav >
  )

}
export default NavbarComp;


