const axios = require('axios')
const { parse } = require('url')

const ROOT = 'https://statsapi.web.nhl.com'
const HEADERS = {
  'Accept-Language': 'en',
	'Dnt': '1',
  'origin': 'https://statsapi.web.nhl.com/',
  'referer': 'https://www.nhl.com/',
  'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
}

const createUrl = (endpoint, query) => {
  const url = parse(`${ROOT}${endpoint}`)
  url.query = query
  return url.format()
}

const createRequest = async (endpoint, query, options) => {
  const url = createUrl(endpoint, query)
  const opts = Object.assign({}, options)
  opts.headers = Object.assign((opts.headers || {}), HEADERS)

  try {
    const response = await axios.get(url, opts)
    return response.data
  } catch (err) {
    throw new Error(`${err.name} - ${err.message}`)
  }
}

module.exports = createRequest