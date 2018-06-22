import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gamesByDate: {},
			isFetching: false,
			didInvalidate: false,
			lastUpdated: null,
			selectedDate: null,
			selectedGame: {}
		};
	}

	render() {
		return (
			<h1>Frigg off, Barb!</h1>
		);
	}
};
