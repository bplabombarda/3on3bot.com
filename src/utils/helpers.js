import axios from 'axios';


const gameUrl = 'https://statsapi.web.nhl.com';

const helpers = {
    getGamesFromDate(date) {
        return axios.get(`${gameUrl}/api/v1/schedule?startDate=${date}&endDate=${date}&expand=schedule.teams,schedule.linescore,schedule.broadcasts.all,schedule.ticket,schedule.game.content.media.epg,schedule.decisions,schedule.scoringplays,schedule.game.content.highlights.scoreboard,team.leaders,schedule.game.seriesSummary,seriesSummary.series&leaderCategories=points,goals,assists&leaderGameTypes=R&site=en_nhl&teamId=`);
    },

    getGameMedia(link) {
        return axios.get(`${gameUrl + link}`);
    }
};

export default helpers;
