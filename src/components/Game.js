import React, { PropTypes, Component } from 'react';

require('../styles/Game.styl');

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const highlights = this.props.game.content.media.milestones.items
    const mediaUrl = highlights[highlights.length - 3].highlight.playbacks[9].url
    this.props.handleSelectGame(mediaUrl)
  }

  render() {
    const away = this.props.game.teams.away.team;
    const home = this.props.game.teams.home.team;
    const awayClasses = `team away away-${away.abbreviation}`;
    const homeClasses = `team home home-${home.abbreviation}`;

    return (
      <li>
        <a className="matchup" onClick={this.handleClick}>
          <span className={awayClasses}>{away.abbreviation}</span>
          <span className={homeClasses}>{home.abbreviation}</span>
        </a>
      </li>
    )
  }
};