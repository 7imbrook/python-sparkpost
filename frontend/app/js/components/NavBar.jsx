import React from 'react';
import '../../scss/navbar.scss';
import Logo from '../../img/sneakspeak_logo.png';

const NavBar = () => (
  <div className="navbar">
    <img
      className="nav-logo"
      src={Logo}
      alt="SneakSpeak"
    />
  </div>
);

export default NavBar;
