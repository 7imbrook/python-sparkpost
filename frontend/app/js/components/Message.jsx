import React from 'react';
import { BOT } from '../actions/messages';
import '../../scss/message.scss';

const Message = props => (
  <div className={`message ${props.from === BOT ? 'bot' : 'human'}`}>
    <div className="from">{props.from === BOT ? 'Sneak Advisor' : 'Joey D from Long Island'}</div>
    <div className="body">
      <div className="content">{props.content}</div>
      <div className="timeStamp">{props.timeStamp.toString()}</div>
    </div>
  </div>
);

Message.propTypes = {
  from: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  timeStamp: React.PropTypes.object.isRequired, // eslint-disable-line
};

export default Message;
