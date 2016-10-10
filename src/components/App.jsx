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
            oTGoals: []
        };
    }

    getOTGoal(allHighlights) {
        let goalHighlights = [];

        allHighlights.forEach((highlight, index) => {
            if (highlight.type === 'GOAL') {
                goalHighlights = [highlight, ...goalHighlights];
            }
        });

        let playbacks = goalHighlights[0].highlight.playbacks;

        return {
            blurb: goalHighlights[0].highlight.blurb,
            source: playbacks[playbacks.length - 2].url
        };
    }

    getOTGames(games) {
        let oTGoals = [];
        if (games) {

            games.games.forEach((game, index) => {

                if (game.linescore.currentPeriod === 4) {

                    helpers.getGameMedia(game.content.link)
                        .then((response) => {

                            let allHighlights = response.data.media.milestones.items;
                            let goalHighlights = [];

                            allHighlights.forEach((highlight, index) => {
                                if (highlight.type === 'GOAL') {
                                    goalHighlights = [highlight, ...goalHighlights];
                                }
                            });

                            let playbacks = goalHighlights[0].highlight.playbacks;

                            let oTGoal = {
                                blurb: goalHighlights[0].highlight.blurb,
                                source: playbacks[playbacks.length - 2].url
                            };

                            return oTGoal;
                        });
                }
            });

            this.setState({
                oTGoals: oTGoals
            });

        } else {
            console.log('No games today!');
        }
    }

    handleDateChange(newDate) {
        this.setState({
            date: newDate
        }, () => {
            helpers.getGamesFromDate(this.state.date.format('YYYY-MM-DD'))
                .then((response) => {
                    this.getOTGames(response.data.dates[0]);
                });
        });
    }

    componentWillMount() {
        this.handleDateChange(moment('2016-02-18'));
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

                <Player highlight={ this.state.oTGoals }
                        blurb={ this.state.oTGoals }
                        />

            </div>
        );
    }
}
