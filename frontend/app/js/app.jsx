import React from 'react';
import { render } from 'react-dom';

if (module.hot) module.hot.accept();

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = () => console.log("on");

recognition.onresult = (event) => {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      console.log(event.results[i][0].transcript);
    }
  }
};

recognition.onerror = (event) => console.log(event);

recognition.onend = () => console.log("off");

window.onload = () => {
  render(
    <div>
      <button onClick={() => recognition.start()}>Start</button>
      <button onClick={() => recognition.stop()}>Stop</button>
    </div>,
    document.getElementById('react'),
  );
};
