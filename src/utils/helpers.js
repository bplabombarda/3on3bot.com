import axios from 'axios';


const gameUrl = 'https://statsapi.web.nhl.com/api/v1';
const mediaUrl = 'https://nhl.bamcontent.com/nhl/id/v1/';

const helpers = {
    getOTGamesFromDate(date) {
        return axios.get(`${gameUrl}/schedule?startDate=${date}&endDate=${date}&expand=schedule.teams,schedule.linescore,schedule.broadcasts.all,schedule.ticket,schedule.game.content.media.epg,schedule.decisions,schedule.scoringplays,schedule.game.content.highlights.scoreboard,team.leaders,schedule.game.seriesSummary,seriesSummary.series&leaderCategories=points,goals,assists&leaderGameTypes=R&site=en_nhl&teamId=`);
    },

    getMediaFromOTGame(content) {
        return axios.get(`${mediaUrl + content}/details/web-v1.json`);
    }
};

export default helpers;
