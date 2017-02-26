import React, { PropTypes, Component } from 'react'

require('./Game.scss');

export default class Game extends Component {
  render() {
    const away = this.props.game.teams.away.team;
    const home = this.props.game.teams.home.team;
    const awayClasses = `team away away-${away.abbreviation}`;
    const homeClasses = `team home home-${home.abbreviation}`;
    return (
      <li>
        <div className="matchup">
          <span className={awayClasses}>{away.abbreviation}</span>
          {' vs '}
          <span className={homeClasses}>{home.abbreviation}</span>
        </div>
      </li>
    )
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired
}
