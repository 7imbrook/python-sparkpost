import React from 'react';
import '../../scss/navbar.scss';
import Logo from '../../img/sneakspeak_logo.png';
import ProfilePic from '../../img/JoeyDFromLongIsland.jpg';

const NavBar = () => (
  <div className="navbar">
	  	<img 
	  		className="nav-profile" 
	  		src={ProfilePic} 
	  		alt="Joey D" />
	  	<span className="nav-user">Joey D from Long Island</span>
	    <img
	      className="nav-logo"
	      src={Logo}
	      alt="SneakSpeak"
	    />
  </div>
);

export default NavBar;
