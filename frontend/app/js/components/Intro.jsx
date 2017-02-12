import React from 'react';
import '../../scss/intro.scss';
import Logo from '../../img/sneakspeak_logo.png';

class Intro extends React.Component {
  componentDidMount() {
    const doc = document.querySelector("body");
    doc.scrollTop = doc.scrollHeight;
  }

  render() {
    return (
      <div className="intro-body" style={{display: this.props.showState ? 'block' : 'none' }}>
        <div className="intro-content">
          <img className="intro-logo" src={Logo} alt="logo" />
          <p className="intro-tagline">Helping with sneakers since 2017</p>
          <p className="intro-pitch">SneakSpeak was designed to assist its users in their day to day when it comes
            to footwear. Whether you&apos;re trying to pick out what kicks to wear or searching for
            something new and rad, our product is the way to go!
          </p>
          <button className="intro-button" onClick={this.props.changeView}>Let&apos;s Go!</button>
        </div>
      </div>
    )
  }
};

export default Intro;
