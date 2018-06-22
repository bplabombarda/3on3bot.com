import React, { Component } from 'react';
import Game from './Game';

require('./Games.scss');

export default class Games extends Component {
  render() {
    return (
      <ul className="gamesList">
        {this.props.games.map((game, i) => {
          return <Game key={game.gamePk} game={game} handleSelectGame={this.props.onSelect}/>
        })}
      </ul>
    );
  }
};