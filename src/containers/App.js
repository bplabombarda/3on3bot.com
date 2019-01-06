import React from 'react'

import getSchedule from '../utils/getSchedule'

export default class App extends React.PureComponent {
  state = {
    date: new Date(2016, 2, 21),
    didInvalidate: false,
    isFetching: false,
    games: [],
  }

  componentDidMount () {
    const schedule = getSchedule(this.state.date)
    console.log(schedule)
  }

  render () {
    return (
      <h1>Test!</h1>
    )
  }
}