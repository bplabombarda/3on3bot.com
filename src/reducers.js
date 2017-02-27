import { combineReducers } from 'redux'
import moment from 'moment';
import {
  SELECT_DATE, INVALIDATE_DATE,
  REQUEST_GAMES, RECEIVE_GAMES,
  SELECT_GAME
} from './actions'

function selectedDate(state = moment(), action) {
  switch (action.type) {
    case SELECT_DATE:
      return action.date
    default:
      return state
  }
}

function selectedGame(state = '', action) {
  switch (action.type) {
    case SELECT_GAME:
      return action.game
    default:
      return state
  }
}

function games(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_DATE:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_GAMES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_GAMES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.games,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function gamesByDate(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_DATE:
    case RECEIVE_GAMES:
    case REQUEST_GAMES:
      return Object.assign({}, state, {
        [action.date]: games(state[action.date], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  gamesByDate,
  selectedDate,
  selectedGame
})

export default rootReducer
