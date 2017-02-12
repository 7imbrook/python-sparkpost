import React from 'react';
import NavBar from './NavBar';
import Chat from './Chat';
import Intro from '../containers/Intro';

const Layout = () => (
  <div className="layout">
  	<Intro />
    <NavBar />
    <Chat />
  </div>
);

export default Layout;
