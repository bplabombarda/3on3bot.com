import axios from 'axios';

const gameUrl = 'https://statsapi.web.nhl.com';

/**
 * TODO: Replace Axios library with fetch and fetch polyfill.
 * https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 * https://github.com/github/fetch
 */
const helpers = {
  getGamesFromDate(date) {
    return axios.get(`${gameUrl}/api/v1/schedule?startDate=${date}&endDate=${date}&expand=schedule.teams,schedule.linescore,schedule.broadcasts.all,schedule.ticket,schedule.game.content.media.epg,schedule.decisions,schedule.scoringplays,schedule.game.content.highlights.scoreboard,team.leaders,schedule.game.seriesSummary,seriesSummary.series&leaderCategories=points,goals,assists&leaderGameTypes=R&site=en_nhl&teamId=`);
  },

  getGameMedia(link) {
    return axios.get(`${gameUrl + link}`);
  },

  findOtGames(data) {
    let oTGames = [];
    data.dates.forEach((date) => {
      date.games.forEach((game) => {
        if (game.linescore.currentPeriod === 4) {
          oTGames = [game, ...oTGames];
        }
      });
    });
    return oTGames;
  },

  findVideoSource(games) {
    let oTGoals = [];
    games.forEach((oTGame) => {
      helpers.getGameMedia(oTGame.content.link)
        .then((response) => {
          const goalEvents = this.findGoalEvents(response);
          return goalEvents;
        })
        .then((goalEvents) => {
          oTGoals = [goalEvents[0], ...oTGoals];
          return oTGoals;
        })
        .then((goals) => {
          this.setState({
            oTGoals: goals,
          });
        });
    });
  },

  findGoalEvents(game) {
    const events = game.data.media.milestones.items;
    let goalEvents = [];
    events.forEach((event) => {
      if (event.type === 'GOAL') {
        goalEvents = [event, ...goalEvents];
      }
    });
    return goalEvents;
  },
};

export default helpers;
