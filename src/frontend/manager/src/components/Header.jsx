import React from 'react';
import logo from '../logo.svg';
import './Header.css'

function Header(props) {
  return (
    <header className={`header ${props.className}`}>
        <img src={logo} alt="logo" width="200" height="50" />
        <div className="header__title">Manager</div>
    </header>
  );
}

export default Header;
