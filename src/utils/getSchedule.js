const axios = require('axios')
const { getTime, format } = require('date-fns')

const getSchedule = async (date) => {
  const API = 'http://localhost:3000/schedule'
  const DATE = format(getTime(date), 'YYYY-MM-DD', {
    awareOfUnicodeTokens: true
  })
  const OPTS = {
    params: {
      endDate: DATE,
      expand: 'schedule.teams,schedule.linescore,schedule.game.content.media.milestones',
      startDate: DATE,
    }
  }

  try {
    const response = await axios.get(API, OPTS)
    return response.data
  } catch (err) {
    throw new Error(`${err.name} - ${err.message}`)
  }
}

export default getSchedule