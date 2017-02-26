import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Games from '../components/Games';
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
    const { selectedDate, gamesByDate, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <DatePicker
          dateFormat="MM-DD-YYYY"
          selected={moment(selectedDate)}
          onChange={this.handleDateChange}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.          
            </span>
          }
        </p>
        {isFetching && gamesByDate[selectedDate] &&
          <h2>Loading...</h2>
        }
        {!isFetching && gamesByDate[selectedDate].items.length === 0 &&
          <h2>Empty.</h2>
        }
        {!isFetching && gamesByDate[selectedDate].items.length > 0 &&
          <div className="gamesContainer" style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Games games={gamesByDate[selectedDate].items} />
          </div>
        }
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  gamesByDate: PropTypes.object,
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
