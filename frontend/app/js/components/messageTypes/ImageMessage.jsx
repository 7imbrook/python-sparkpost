import React from 'react';

const ImageMessage = props => (
  <div className="img-content">
    <img src={props.content} alt="Message" />
  </div>
);

export default ImageMessage;
