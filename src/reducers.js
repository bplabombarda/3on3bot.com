import { combineReducers } from 'redux'
import {
  SELECT_DATE, INVALIDATE_DATE,
  REQUEST_DATE, RECEIVE_DATE
} from './actions'

function selectedDate(state = `${Date.now()}`, action) {
  switch (action.type) {
    case SELECT_DATE:
      return action.date
    default:
      return state
  }
}

function posts(state = {
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
