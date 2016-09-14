const axios = require('axios');

const baseURL = 'https://statsapi.web.nhl.com/api/v1/';
const date = process.argv[2] || '02-09-16';

function getOTGames(baseURL, date) {
    axios.get(`${baseURL}/schedule?startDate=${date}&endDate=${date}&expand=schedule.teams,schedule.linescore,schedule.broadcasts.all,schedule.ticket,schedule.game.content.media.epg,schedule.decisions,schedule.scoringplays,schedule.game.content.highlights.scoreboard,team.leaders,schedule.game.seriesSummary,seriesSummary.series&leaderCategories=points,goals,assists&leaderGameTypes=R&site=en_nhl&teamId=`);
}

getOTGames(baseURL, date).then((response) => {
        console.log(response);
    });
