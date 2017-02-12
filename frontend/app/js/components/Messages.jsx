import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Message from './Message';
// import Summary from './Summary';
import '../../scss/animations.scss';


class Messages extends React.Component {
  static propTypes = {
    messages: React.PropTypes.array.isRequired, // eslint-disable-line
  }

  componentDidMount() {
    this.scroll.scrollTop = this.scroll.scrollHeight;
  }

  componentDidUpdate() {
    this.scroll.scrollTop = this.scroll.scrollHeight;
  }

  render() {
    const messages = this.props.messages.map(message =>
      (<Message
        key={message.id}
        {...message}
      />)
    );

    return (
      <div
        className="messages"
        ref={(c) => { this.scroll = c; }}
      >
        <ReactCSSTransitionGroup
          component="div"
          transitionName="move"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {messages}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Messages;
