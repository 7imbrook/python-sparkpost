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
    const messages = this.props.messages.map((message, index, messages) => { // eslint-disable-line
      if (this.props.messages.length > 1) {
        if (index === 0) {
          if (message.from === messages[1].from) {
            return {
              ...message,
              group: true,
              first: true,
            };
          }
        } else if (index === this.props.messages.length - 1) {
          if (message.from === messages[index - 1].from) {
            return {
              ...message,
              group: true,
              last: true,
            };
          }
        } else if (index !== this.props.messages.length - 1) {
          if (message.from === messages[index + 1].from) {
            if (message.from === messages[index - 1].from) {
              return {
                ...message,
                middle: true,
                group: true,
              };
            }
          } else if (message.from === messages[index - 1].from) {
            return {
              ...message,
              group: true,
              last: true,
            };
          }
          return {
            ...message,
            first: true,
            group: true,
          };
        }
      }
      return {
        ...message,
        group: false,
      };
    }).map(message =>
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
