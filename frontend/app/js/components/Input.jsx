import React from 'react';
import '../../scss/input.scss';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="input-bar">
        <div className="mic-btn">
          <i className="fa fa-microphone" />
        </div>
        <div className="input-container">
          <input type="text" />
        </div>
      </div>
    );
  }
}

export default Input;
