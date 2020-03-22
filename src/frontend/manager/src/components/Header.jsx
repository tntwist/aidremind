import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import './Header.css'

function Header(props) {
  return (
    <header className={`header ${props.className}`}>
        <Link to="/">
          <img src={logo} alt="logo" width="200" height="50" />
        </Link>
        <div className="header__title">Manager</div>
    </header>
  );
}

export default Header;
