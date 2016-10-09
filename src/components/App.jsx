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
            oTGames: []
        };
    }

    getOTGames(games) {
        if (games) {
            let oTGames = [];
            games.games.forEach((game) => {
                if (game.linescore.currentPeriod === 4) {
                    this.getGameMedia(game.content.link);
                }
            });
            this.setState({
                oTGames: oTGames
            });
        } else {
            console.log('No games today!');
        }
    }

    getGameMedia(link) {
        helpers.getGameMedia(link)
            .then((response) => {
                console.log(response);
            });
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
        this.handleDateChange(moment('2016-02-21'));
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

                <Player source={ this.state.oTGames[0] ? this.state.oTGames[0].source : '' }
                        title={ this.state.oTGames[0] ? this.state.oTGames[0].title : '' }
                        />

            </div>
        );
    }
}
