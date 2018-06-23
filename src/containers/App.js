import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Player from '../components/Player';
import Games from '../components/Games';
import { selectDate, fetchGamesIfNeeded, selectGame } from '../actions/actions';

require('react-datepicker/dist/react-datepicker.css');
require('../styles/App.styl');

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleSelectGame = this.handleSelectGame.bind(this)
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

  handleSelectGame(mediaUrl) {
    this.props.dispatch(selectGame(mediaUrl))
  }

  render() {
    const { selectedDate, gamesByDate, isFetching, lastUpdated, selectedGame } = this.props;
    return (
      <div>
        <header>
          <span>Choose a date, motherfucker:</span>
          <DatePicker
            dateFormat="MM-DD-YYYY"
            selected={moment(selectedDate)}
            onChange={this.handleDateChange}
          />
        </header>
        {selectedGame &&
          <Player source={selectedGame} />
        }
        {/* <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            </span>
          }
        </p> */}
        {isFetching && gamesByDate[selectedDate] &&
          <h2>Loading...</h2>
        }
        {!isFetching && gamesByDate[selectedDate].items.length === 0 &&
          <h2>No OT Games Today.</h2>
        }
        {!isFetching && selectedDate.isAfter(moment()) &&
          <img src="../../assets/images/future.gif" alt="placeholder+image" />
        }
        {!isFetching && gamesByDate[selectedDate].items.length > 0 &&
          <div className="gamesContainer" style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Games
              games={gamesByDate[selectedDate].items}
              onSelect={this.handleSelectGame}
            />
          </div>
        }
      </div>
    );
  }
}

// AsyncApp.propTypes = {
//   selectedDate: PropTypes.object.isRequired,
//   gamesByDate: PropTypes.object,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// }

function mapStateToProps(state) {
  const { selectedDate, gamesByDate, selectedGame } = state;
  const {
    isFetching,
    lastUpdated,
  } = gamesByDate[selectedDate] || {
    isFetching: true,
    items: []
  };

  return {
    selectedDate,
    selectedGame,
    gamesByDate,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(AsyncApp);
