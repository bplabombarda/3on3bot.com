import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Player from './Player/Player';
// import Games from './Games/Games';
// import Game from './Game/Game';
import helpers from '../utils/helpers';

require('react-datepicker/dist/react-datepicker.min.css');
require('./App.scss');


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
            otGames: []
        };
    }

    handleDateChange(newDate) {
        this.setState({
            date: newDate
        }, () => {
            helpers.getGamesFromDate(this.state.date.format('YYYY-MM-DD'))
                .then((response) => {

                    let gamesOnDate = response.data.dates[0];

                    if (gamesOnDate) {

                        let otGames = [];

                        gamesOnDate.games.forEach((game) => {

                            if (game.linescore.currentPeriod === 4) {

                                let goalHighlights = game.content.highlights.scoreboard.items;
                                let srcHighlight = goalHighlights[goalHighlights.length - 1];

                                let oTGameObj = {
                                    away: {
                                        teamName: game.teams.away.team.teamName,
                                        locationName: game.teams.away.team.locationName,
                                        abbr: game.teams.away.team.abbreviation
                                    },
                                    home: {
                                        teamName: game.teams.home.team.teamName,
                                        locationName: game.teams.home.team.locationName,
                                        abbr: game.teams.home.team.abbreviation
                                    },
                                    title: goalHighlights[goalHighlights.length - 1].title,
                                    source: srcHighlight.playbacks[srcHighlight.playbacks.length - 1].url,
                                };

                                otGames = [oTGameObj, ...otGames];
                            }
                        });

                        this.setState({
                            otGames: otGames
                        });

                    } else {
                        console.log('No games today!');
                    }

                });
        });
    }

    componentWillMount() {
        this.handleDateChange(moment());
    }

    render() {
        return (
            <div className="container">
                <header>

                    <DatePicker
                        dateFormat="MM-DD-YY"
                        selected={moment(this.state.date)}
                        onChange={this.handleDateChange.bind(this)}
                        />

                </header>

                <Player autostart={false} slug={'klingberg-picks-corner-in-ot'} topic={'277984386'} content={'41089003'}/>
                
            </div>
        );
    }
}
