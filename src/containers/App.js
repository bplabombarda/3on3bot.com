import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { fetchGames } from '../utils/statsapi';

require('react-datepicker/dist/react-datepicker.css');

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gamesByDate: {},
			isFetching: false,
			didInvalidate: false,
			lastUpdated: null,
			selectedDate: moment(),
			selectedGame: {}
		};

		this.handleDateChange = this.handleDateChange.bind(this);
	}

	componentDidMount() {
		fetchGames(this.state.selectedDate)
			.then(response => response.json())
	    .then((json) => {
	      const games = json.dates[0].games.filter((game) => {
	        if (game.linescore.currentPeriod === 4) {
	        	getGameType(game);
	          return game;
	        }
	      })
	      return games;
	    })
	    .then(games => console.log(games))
	}

	handleDateChange(nextDate) {
		console.log(this.state)
		this.setState({
			selectedDate: moment(nextDate)
		})
	}

	render() {
		return (
			<DatePicker
				dateFormat="MM-DD-YYYY"
				selected={moment(this.state.selectedDate)}
				onChange={this.handleDateChange}
				todayButton={"Today"}
				className=""
			/>
		);
	}
};
