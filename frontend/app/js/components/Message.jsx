import React from 'react';
import { BOT, PLAINTEXT_MESSAGE, IMAGE_MESSAGE } from '../actions/messages';
import '../../scss/message.scss';
import PlaintextMessage from './messageTypes/PlaintextMessage';

function generateMessageBody(message) {
  switch (message.messageFormat) {
    case PLAINTEXT_MESSAGE:
      return (
        <PlaintextMessage
          content={message.content}
        />
      );
    case IMAGE_MESSAGE:
      return (
        <div>image..</div>
      );
    default:
      return (<div>unknown message format</div>);
  }
}

const Message = props => (
  <div className={`message ${props.from === BOT ? 'bot' : 'human'}`}>
    <div className="from">{props.from === BOT ? 'Sneak Advisor' : 'Joey D from Long Island'}</div>
    <div className="body">
      {generateMessageBody(props)}
    </div>
    <div className="timeStamp">{`${props.timeStamp.toLocaleDateString()} ${props.timeStamp.toTimeString().split(' ')[0]}`}</div>
  </div>
);

Message.propTypes = {
  from: React.PropTypes.string.isRequired,
  // content: React.PropTypes.string.isRequired,
  timeStamp: React.PropTypes.object.isRequired, // eslint-disable-line
};

export default Message;
