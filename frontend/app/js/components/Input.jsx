import React from 'react';
import '../../scss/input.scss';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMicClick = this.handleMicClick.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleKeyPress(event) {
    if (event.charCode === 13 && this.state.value.length > 0) {
      this.props.onChange(this.state.value);
      this.setState({
        value: '',
      });
    }
  }

  handleMicClick() {
    if (this.props.listening) {
      return this.props.onStopListening();
    }
    return this.props.onListening();
  }

  render() {
    return (
      <div className="input-bar">
        <button
          className="mic-btn"
          onClick={this.handleMicClick}
        >
          <div className="mic-glyph">
            <i className="fa fa-microphone" />
          </div>
        </button>
        <div className="input-container">
          <div className="input-bar">
            <input
              placeholder={this.props.listening ? 'Listening...' : 'Type Something...'}
              type="text"
              value={this.state.value}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              disabled={this.props.listening}
            />
          </div>
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  listening: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  onListening: React.PropTypes.func,
  onStopListening: React.PropTypes.func,
};

Input.defaultProps = {
  listening: false,
  onChange: () => {},
  onListening: () => {},
  onStopListening: () => {},
};

export default Input;
