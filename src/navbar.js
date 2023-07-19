/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <h1>Creamos Tu Sitio</h1>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/QuienesSomos">
          <li>Quienes Somos</li>
        </Link>
        <Link to="/PokemonList">
          <li>PokemonList</li>
        </Link>
        <Link to="/Contacto">
          <li>Contacto</li>
        </Link>
        <Link to="/Cotizacion">
          <li>Cotizacion</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;