import 'whatwg-fetch';

const apiRoot = 'https://statsapi.web.nhl.com';

function getGameType(game) {
	switch (game.gameType) {
		case 'PR':
			console.log('preseason');
			break;

		case 'R':
			console.log('regular season');
			break;

		case 'P':
			console.log('postseason');
			break;

		default:
			console.log('regular season');
			break;
	}
}

export function fetchGames(date) {
	const schedule = `
		${apiRoot}/api/v1/schedule?
		startDate=${date.format('YYYY-MM-DD')}&
		endDate=${date.format('YYYY-MM-DD')}&
		expand=schedule.teams,schedule.linescore,schedule.game.content.media.milestones
	`;

	return fetch(`${schedule}`);
}