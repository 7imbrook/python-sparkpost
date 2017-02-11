/* eslint-disable */
const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;

recognition.onstart = () => console.log('Starting Recognition');
recognition.onend = () => console.log('Ending Recognition');

export default recognition;
