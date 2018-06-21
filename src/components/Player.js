import React from 'react';

require('./Player.scss');

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
}

// Player.propTypes = {
//   source: React.PropTypes.string
// };
