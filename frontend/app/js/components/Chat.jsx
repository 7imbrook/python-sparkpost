import React from 'react';
import Messages from '../containers/Messages';
import InputContainer from '../containers/InputContainer';
import '../../scss/chat.scss';

const Chat = () => (
  <div className="chat-container">
    <Messages />
    <InputContainer />
  </div>
);

export default Chat;
