import React from 'react';

// require('./Player.scss');

export default function Player(props) {
  return (
    <div id="frameContainer">
      <iframe
        id="vidFrame"
        src={props.source}
        height="360"
        width="640"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
      />
    </div>
  );
}

Player.propTypes = {
  source: React.PropTypes.string
};
