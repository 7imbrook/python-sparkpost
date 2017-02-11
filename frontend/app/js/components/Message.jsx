import React from 'react';
import { BOT } from '../actions/messages';
import '../../scss/message.scss';

const Message = props => (
  <div className={`message ${props.from === BOT ? 'bot' : 'human'}`}>
    <div className="body">
      <div className="from">{props.from === BOT ? 'Sneak Advisor' : 'Joey D from Long Island'}</div>
      <div className="content">{props.content}</div>
      <div className="timeStamp">{props.timeStamp}</div>
    </div>
  </div>
);

Message.propTypes = {
  from: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  timeStamp: React.PropTypes.string.isRequired,
};

Message.defaultProps = {
  from: BOT,
  content: 'dank memer',
  timeStamp: 'feb 31 25:00 pm',
};

export default Message;
