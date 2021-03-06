import 'whatwg-fetch';

export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const SELECT_DATE = 'SELECT_DATE';
export const INVALIDATE_DATE = 'INVALIDATE_DATE';
export const SELECT_GAME = 'SELECT_GAME';

const apiRoot = 'https://statsapi.web.nhl.com';

export function selectDate(date) {
  return {
    type: SELECT_DATE,
    date
  };
}

export function invalidateDate(date) {
  return {
    type: INVALIDATE_DATE,
    date
  };
}

export function requestGames(date) {
  return {
    type: REQUEST_GAMES,
    date
  };
}

export function receiveGames(date, json) {
  return {
    type: RECEIVE_GAMES,
    date,
    games: json,
    receivedAt: Date.now()
  };
}

export function selectGame(mediaUrl) {
  return {
    type: SELECT_GAME,
    game: mediaUrl
  };
}

function fetchGames(date) {
  return dispatch => {
    dispatch(requestGames(date))
    return fetch(`${apiRoot}/api/v1/schedule?startDate=${date.format('YYYY-MM-DD')}&endDate=${date.format('YYYY-MM-DD')}&expand=schedule.teams,schedule.linescore,schedule.game.content.media.milestones`)
      .then(response => response.json())
      .then((json) => {
        const games = json.dates[0].games.filter((game) => {
          if (game.linescore.currentPeriod === 4) {
            return game;
          }
        })
        return games;
      })
      .then(json => dispatch(receiveGames(date, json)));
  };
}

function shouldFetchGames(state, date) {
  const games = state.gamesByDate[date]
  if (!games) {
    return true
  } else if (games.isFetching) {
    return false
  } else {
    return games.didInvalidate
  }
}

export function fetchGamesIfNeeded(date) {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState(), date)) {
      return dispatch(fetchGames(date))
    }
  };
}
