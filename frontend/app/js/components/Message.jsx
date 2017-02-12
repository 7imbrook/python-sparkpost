import React from 'react';
import { BOT, PLAINTEXT_MESSAGE, IMAGE_MESSAGE } from '../actions/messages';
import '../../scss/message.scss';
import PlaintextMessage from './messageTypes/PlaintextMessage';
import ImageMessage from './messageTypes/ImageMessage';

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
        <ImageMessage
          content={message.content}
        />
      );
    default:
      return (<div>unknown message format</div>);
  }
}

const Message = props => (
  <div className={`message ${props.from === BOT ? 'bot' : 'human'} ${props.group ? 'group' : ''} ${props.first ? 'first' : ''} ${props.middle ? 'middle' : ''} ${props.last ? 'last' : ''}`}>
    <div className="from">{props.from === BOT ? 'Sneak Advisor' : 'Joey D from Long Island'}</div>
    <div className={`body ${props.messageFormat === IMAGE_MESSAGE ? 'image' : ''}`}>
      {generateMessageBody(props)}
    </div>
    <div className="timeStamp">{`${props.timeStamp.toLocaleDateString()} ${props.timeStamp.toTimeString().split(' ')[0]}`}</div>
  </div>
);

Message.propTypes = {
  from: React.PropTypes.string.isRequired,
  group: React.PropTypes.bool,
  first: React.PropTypes.bool,
  middle: React.PropTypes.bool,
  last: React.PropTypes.bool,
  // content: React.PropTypes.string.isRequired,
  timeStamp: React.PropTypes.object.isRequired, // eslint-disable-line
};

Message.defaultProps = {
  group: false,
  first: false,
  middle: false,
  last: false,
};

export default Message;
