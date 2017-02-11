import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';

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
    <Provider store={store}>
      <div>
        <button onClick={() => recognition.start()}>Start</button>
        <button onClick={() => recognition.stop()}>Stop</button>
      </div>
    </Provider>,
    document.getElementById('react'),
  );
};
