import React from 'react'
import DatePicker from 'react-datepicker'
import { hot } from 'react-hot-loader'

import 'react-datepicker/dist/react-datepicker.css'

import getSchedule from '../utils/getSchedule'

class Root extends React.Component {
  state = {
    date: new Date(2016, 9, 16),
    gamesByDate: {},
    loading: true,
  }

  componentDidMount = async () => {
    const games = await this.fetchGames(this.state.date)
    this.setState({
      gamesByDate: {
        [this.state.date]: games,
      },
      loading: false,
    })
  }

  fetchGames = async (date) => {
    const schedule = await getSchedule(date)
    return await this.getOtGames(schedule)
  }

  handleChange = (date) => {
    this.setState({
      loading: true,
    }, async () => {
      const games = await this.fetchGames(date)
      this.setState({
        date,
        gamesByDate: {
          ...this.state.gamesByDate,
          [date]: games,      
        },
        loading: false,
      })
    })
  }

  isOvertime = (game) => {
    const { currentPeriod }= game.linescore
    const { statusCode }= game.status
    return currentPeriod === 4 && parseInt(statusCode) === 7
  }

  getOtGames = (schedule) => {
    return schedule.dates.reduce((acc, date) => {
      const otGames = date.games.filter((game) => {      
        return this.isOvertime(game)
      })
      return [ ...acc, ...otGames ]
    }, [])
  }

  render () {
    return (
      <>
        <h1>{ this.state.loading ? 'Loading': 'Done' }</h1>
        <DatePicker
          selected={ this.state.date }
          onChange={ this.handleChange }
        />
      </>
    )
  }
}

export default hot(module)(Root)