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
            games: []
        };
    }

    handleDateChange(newDate) {
        this.setState({
            date: newDate
        }, () => {
            helpers.getGamesFromDate(this.state.date.format('YYYY-MM-DD'))
                .then((response) => {
                    let date = response.data.dates[0];
                    if (date) {
                        date.games.forEach((game) => {
                            if (game.linescore.currentPeriod === 4) {
                                console.log(game);
                                this.setState({
                                    games: [game, ...this.state.games]
                                });
                            }
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
                <DatePicker
                    dateFormat="MM-DD-YY"
                    selected={moment(this.state.date)}
                    onChange={this.handleDateChange.bind(this)} />
                <Player autostart={false} slug={'klingberg-picks-corner-in-ot'} topic={'277984386'} content={'41089003'}/>
            </div>
        );
    }
}
