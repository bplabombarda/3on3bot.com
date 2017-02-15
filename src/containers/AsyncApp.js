import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { selectDate, fetchGamesIfNeeded, invalidateDate } from '../actions';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
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

  handleChange(nextDate) {
    this.props.dispatch(selectDate(nextDate))
    this.props.dispatch(fetchGamesIfNeeded(nextDate))
  }

  render() {
    const { selectedDate, games, isFetching, lastUpdated } = this.props
    return (
      <div>
        <DatePicker
          dateFormat="MM-DD-YY"
          selected={moment(selectedDate)}
          onChange={this.handleDateChange}
        />
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedDate, gamesByDate } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = gamesByDate[selectedDate] || {
    isFetching: true,
    items: []
  }

  return {
    selectedDate,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
