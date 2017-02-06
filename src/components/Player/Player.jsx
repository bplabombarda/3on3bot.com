import React from 'react';

require('./Player.scss');

function Player(props) {
  return (
    <div id="frameContainer">
      <iframe
        id="vidFrame"
        src={props.source}
        frameBorder="0"
        scrolling="no"
        allowFullScreen
      />
      <h3 className="videoTitle">{props.title}</h3>
    </div>
  );
}

Player.propTypes = {
  source: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

Player.defaultProps = {
  source: 'http://md-akc.med.nhl.com/mp4/nhl/2016/02/19/178ff968-2628-4dc6-ba9c-98112a15b7fe/1455854223047/asset_1800k.mp4',
  title: 'LAK@STL: Schwartz\'s overtime winner',
};

module.exports = Player;
