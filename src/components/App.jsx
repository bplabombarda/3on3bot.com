import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import Player from './Player/Player';
// import Games from './Games/Games';
// import Game from './Game/Game';
import Nav from './Nav/Nav';
import helpers from '../utils/helpers';

require('react-datepicker/dist/react-datepicker.min.css');
require('./App.scss');


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
            content: ''
        };
    }

    handleDateChange(newDate) {
        this.setState({
            date: newDate
        });
    }

    init() {
        this.setState({
            date: moment()
        });
    }

    componentWillMount() {
        this.init();
    }

    render() {
        return (
            <div className="container">
                <Nav/>
                <DatePicker
                    dateFormat="MM-DD-YY"
                    selected={moment(this.state.date)}
                    onChange={this.handleDateChange.bind(this)} />
                <h1>3on3bot</h1>
                <span>{ moment(this.state.date).format('MM-DD-YY') }</span>
            </div>
        );
    }
}
