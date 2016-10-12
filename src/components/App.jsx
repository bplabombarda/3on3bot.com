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

        this.state = {
            date: null,
            oTGoals: []
        };
    }

    handleDateChange(newDate) {
        this.setState({
            date: newDate
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
                                console.log(events);
                                let goalEvents = [];
                                events.forEach((event) => {
                                    if (event.type === 'GOAL') {
                                        console.log(event);
                                        goalEvents = [event, ...goalEvents];
                                    }
                                });
                                return goalEvents;
                            })
                            .then((goalEvents) => {
                                console.log(goalEvents);
                            });
                    });
                });
        });
    }

    getOTGoals(oTGames) {

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
