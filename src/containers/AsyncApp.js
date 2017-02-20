import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { selectDate, fetchGamesIfNeeded, invalidateDate } from '../actions';

require('react-datepicker/dist/react-datepicker.css');

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedDate } = this.props
    dispatch(fetchGamesIfNeeded(selectedDate))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate !== this.props.selectedDate) {
      const { dispatch, selectedDate } = nextProps
      dispatch(fetchGamesIfNeeded(selectedDate))
    }
  }

  handleDateChange(nextDate) {
    this.props.dispatch(selectDate(nextDate))
    this.props.dispatch(fetchGamesIfNeeded(nextDate))
  }

  render() {
    const { selectedDate, gamesByDate, isFetching, lastUpdated } = this.props
    console.log(gamesByDate)
    return (
      <div>
        <DatePicker
          dateFormat="MM-DD-YYYY"
          selected={moment(selectedDate)}
          onChange={this.handleDateChange}
        />

      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  games: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedDate, gamesByDate } = state
  const {
    isFetching,
    lastUpdated,
  } = gamesByDate[selectedDate] || {
    isFetching: true,
    items: []
  }

  return {
    selectedDate,
    gamesByDate,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
