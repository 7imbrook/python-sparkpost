import React from 'react';
import Message from './Message';
import Summary from './Summary';

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
    const messages = this.props.messages.map(message => {
      if(true) {
        return <Message key={message.id} {...message} />;
      }
      else {
        return <Summary />
      }
    });

    return (
      <div ref={(c) => { this.scroll = c; }} className="messages">      
        {messages}
      </div>
    );
  }
}

export default Messages;
