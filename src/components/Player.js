import React from 'react';

require('../styles/Player.scss');

export default function Player(props) {
  return (
    <div className="frameContainer">
      <video
        id="vidFrame"
        src={props.source}
        controls
        autoPlay
      >
      </video>
    </div>
  );
};
