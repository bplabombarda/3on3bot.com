import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleDateChange(nextDate) {
		this.props.handleDateChange(nextDate);
	}

	render() {
		return (
			<header>
        <span>Choose a date, motherfucker:</span>
        <DatePicker
          dateFormat="MM-DD-YYYY"
          selected={moment(this.props.selectedDate)}
          onChange={this.handleDateChange}
        />
      </header>
		);
	}
}