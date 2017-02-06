import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Player from './Player/Player';
import helpers from '../utils/helpers';

require('react-datepicker/dist/react-datepicker.min.css');
require('./App.scss');


export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);

    this.state = {
      date: null,
      oTGoals: [],
    };
  }

  componentWillMount() {
    this.handleDateChange(moment('2016-02-18'));
  }

  handleDateChange(newDate) {
    this.setState({
      date: newDate,
    }, () => {
      helpers.getGamesFromDate(this.state.date.format('YYYY-MM-DD'))
        .then((response) => {
          let oTGames = [];
          response.data.dates.forEach((date) => {
            date.games.forEach((game) => {
              if (game.linescore.currentPeriod === 4) {
                oTGames = [game, ...oTGames];
              }
            });
          });
          return oTGames;
        })
        .then((oTGames) => {
          let oTGoals = [];
          oTGames.forEach((oTGame) => {
            helpers.getGameMedia(oTGame.content.link)
              .then((response) => {
                const events = response.data.media.milestones.items;
                let goalEvents = [];
                events.forEach((event) => {
                  if (event.type === 'GOAL') {
                    goalEvents = [event, ...goalEvents];
                  }
                });
                return goalEvents;
              })
              .then((goalEvents) => {
                oTGoals = [goalEvents[0], ...oTGoals];
                return oTGoals;
              })
              .then((goals) => {
                this.setState({
                  oTGoals: goals,
                });
              });
          });
        });
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <DatePicker
            dateFormat="MM-DD-YY"
            selected={moment(this.state.date)}
            onChange={this.handleDateChange}
          />
        </header>
        <Player
          source={this.state.oTGoals[0]}
          blurb={this.state.oTGoals}
        />
      </div>
    );
  }
}
