import React, { PropTypes, Component } from 'react'
import Game from './Game'

require('./Games.scss');

export default class Games extends Component {
  render() {
    return (
      <ul className="gamesList">
        {this.props.games.map((game, i) => {
          if(game.linescore.currentPeriod === 4) {
            return <Game key={game.gamePk} game={game} />
          }
        })}
      </ul>
    )
  }
}

Games.propTypes = {
  games: PropTypes.array.isRequired
}
