import React from 'react';
import Message from './Message';
import { BOT, HUMAN } from '../actions/messages';

const tempMessages = [
  {
    from: BOT,
    content: 'This is message one',
    timeStamp: 'Feb 31 25:00pm',
  },
  {
    from: HUMAN,
    content: 'This is message two',
    timeStamp: 'Feb 31 25:01pm',
  },
  {
    from: BOT,
    content: 'This is message three',
    timeStamp: 'Feb 31 25:02pm',
  },
  {
    from: HUMAN,
    content: 'This is message four',
    timeStamp: 'Feb 31 25:03pm',
  },
  {
    from: BOT,
    content: 'This is message five',
    timeStamp: 'Feb 31 25:04pm',
  },
  {
    from: HUMAN,
    content: 'This is message six',
    timeStamp: 'Feb 31 25:05pm',
  },
  {
    from: BOT,
    content: 'This is message seven',
    timeStamp: 'Feb 31 25:06pm',
  },
  {
    from: HUMAN,
    content: 'This is message eight',
    timeStamp: 'Feb 31 25:07pm',
  },
];

class Messages extends React.Component {
  componetDidMount() {
    this.scroll.scrollTop = this.scroll.scrollHeight;
  }

  componetDidUpdate() {
    this.scroll.scrollTop = this.scroll.scrollHeight;
  }

  render() {
    const messages = tempMessages.map(message => (
      <Message key={message.content} {...message} />
    ));

    return (
      <div ref={(c) => { this.scroll = c; }} className="messages">
        {messages}
      </div>
    );
  }
}

export default Messages;
