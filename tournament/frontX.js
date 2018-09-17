const TeamMethods = {
	getDoubles: function getDoubles(data, team) {
		if (data.teamSize > 0) {
			let i = 0;
			while (i < data.teamSize) {
				let matchPlayers = getTwoRandomNos(data.size);
				let p1 = data.ttLook[matchPlayers.p1], p2 = data.ttLook[matchPlayers.p2];
				let arrContains = team[data.ar].some(t => t.bpName == p1.name + ' + ' + p2.name || t.bpNameAlt == p1.name + ' + ' + p2.name);
				if (!arrContains) {
					team[data.ar].push({
						bpName: p1.name + ' + ' + p2.name,
						bpNameAlt: p2.name + ' + ' + p1.name,
						history: [],
						player1: p1.id,
						player1Full: p1,
						player1Name: p1.name,
						player2: p2.id,
						player2Full: p2,
						player2Name: p2.name,
						points: 0,
						team: team.team,
						type: data.type,
					});

					i++;
				}
			}
		}
	},

	createDoubles: function createDoubles(team) {
		let men = team.players.filter(f => f.sex == 'M');
		let women = team.players.filter(f => f.sex == 'F');

		let menTeamSize = men.length % 2 == 0 ? men.length / 2 : (men.length - 1) / 2;
		let womenTeamSize = women.length % 2 == 0 ? women.length / 2 : (women.length - 1) / 2;

		let teamData = [
			{ teamSize: menTeamSize, size: men.length, ar: 'menDoubles', type: 'DM', ttLook: men },
			{ teamSize: womenTeamSize, size: women.length, ar: 'womenDoubles', type: 'DF', ttLook: women }
		];

		teamData.forEach(td => TeamMethods.getDoubles(td, team));
	},

	createMixDoubles: function createMixDoubles(team) {
		let men = team.players.filter(f => f.sex == 'M');
		let women = team.players.filter(f => f.sex == 'F');

		let randomGp, staticGp;
		if (men.length < women.length) {
			randomGp = women;
			staticGp = men;
		} else {
			randomGp = men;
			staticGp = women;
		}

		for (let i = 0; i < staticGp.length;) {
			let p = staticGp[i];
			let rnd = Math.floor(Math.random() * randomGp.length);
			let randomP = randomGp[rnd];

			let mdContains = team.mixDoubles.some(t => t.bpName == p.name + ' + ' + randomP.name || t.bpNameAlt == p.name + ' + ' + randomP.name);
			if (!mdContains) {
				team.mixDoubles.push({
					player1Full: p,
					player2Full: randomP,
					team: team.team,
					type: 'MD',
					history: [],
					player1: i,
					player1Name: p.name,
					player2: rnd,
					player2Name: randomP.name,
					bpName: p.name + ' + ' + randomP.name,
					bpNameAlt: randomP.name + ' + ' + p.name,
					team: team.team,
					points: 0,
					history: []
				});

				i++;
			}
		}
	}
}

const ScheduleMethods = {
	generateMatchSchedule: function generateMatchSchedule() {
		config.isTournamentStarted = true;
		$("#tStarted").show("slow");
		$("#tNotStarted").hide("slow");

		for (const key in schedule) {
			let arrayToFilter = key.includes('Singles') ? 'players' : (key.includes('mix') ? 'mixDoubles' : (key.includes('women') ? 'womenDoubles' : 'menDoubles'));
			let propToFilter = key.includes('Singles') ? 'sex' : 'type';
			let keyPlayers = [];

			teamsX.forEach(t => {
				let x = t[arrayToFilter].filter(f => f[propToFilter] == conditions[key]);
				x.map(xx => keyPlayers.push(xx))
			});

			let players = teamsX.map(t => (t[arrayToFilter].filter(f => f[propToFilter] == conditions[key]).length)).reduce((x, y) => x + y);
			let matches = {}, count = 0;

			config.stages.forEach(stage => {
				if (stage.limit < players) {
					schedule[key] = {};
					count++;

					let m = stage.knockOut ? (players % 2 == 0 ? players / 2 : (players + 1) / 2) : Array.from({ length: players }, (v, k) => k).reduce((x, y) => x + y, 0);
					stage.pCount = players;
					matches[stage.key] = (Object.assign({}, stage, { matchCount: m, order: count }));
					players = stage.knockOut ? m : stage.limit;
					schedule[key] = matches;
				}
			});

			if (key.includes('Singles')) {
				ScheduleMethods.generateScheduleForSingles(keyPlayers, key);
			} else {
				ScheduleMethods.generateScheduleForDoubles(keyPlayers, key);
			}
		}

		console.log('schedule from frontX: ', schedule);
	},

	generateScheduleForSingles: function generateScheduleForSingles(players, keyName) {
		const stage = config.stages.find(s => s.limit < players.length);
		stage.pCount = players.length;
		let matches = [];

		// Select two random players from the players length;
		if (stage.knockOut) {
			if (players.length % 2 !== 0) {
				players.push({ id: 1, name: 'bye', sex: '', history: [], team: -1, playerId: players.length })
			}

			let incPlayers = new Set();
			while (incPlayers.size < players.length) {
				let matchPlayers = getTwoRandomNos(players.length);
				while (!incPlayers.has(matchPlayers.p1) && !incPlayers.has(matchPlayers.p2)) {
					matches.push({
						p1: players[matchPlayers.p1].name,
						p2: players[matchPlayers.p2].name,
						won: players[matchPlayers.p1].name === 'bye' ? players[matchPlayers.p2].name : (players[matchPlayers.p2].name === 'bye' ? players[matchPlayers.p1].name : ''),
						p1Score: 0,
						p2Score: 0
					})
					incPlayers.add(matchPlayers.p1);
					incPlayers.add(matchPlayers.p2);
				}
			}
		} else {
			for (let i = 0; i < players.length; i++) {
				const player1 = players[i];
				for (let j = i + 1; j < players.length; j++) {
					const player2 = players[j];
					matches.push({
						p1: player1.name,
						p2: player2.name,
						won: player1.name === 'bye' ? player2.name : (player2.name === 'bye' ? player1.name : ''),
						p1Score: 0,
						p2Score: 0
					});
				}
			}
		}

		schedule[keyName][stage.key]["matches"] = matches;
	},

	generateScheduleForDoubles: function generateScheduleForDoubles(players, keyName) {
		const stage = config.stages.find(s => s.limit < players.length);
		let matches = [];

		// console.log(' doubles from gen schedule: ', keyName,  players);

		if (stage.knockOut) {
			if (players.length % 2 !== 0) {
				players.push({ id: 1, name: 'bye', sex: '', history: [], team: -1, playerId: players.length })
			}

			let incPlayers = new Set();
			while (incPlayers.size < players.length) {
				let matchPlayers = getTwoRandomNos(players.length);
				while (!incPlayers.has(matchPlayers.p1) && !incPlayers.has(matchPlayers.p2)) {
					let t1 = players[matchPlayers.p1], t2 = players[matchPlayers.p2];
					let firstPlayer = t1.name == 'bye' ? 'bye' : (
						teamsX.find(f => f.team == t1.team)[keyName].find(p => p.bpName == t1.bpName).bpName);

					let secondPlayer = t2.name == 'bye' ? 'bye' : (
						teamsX.find(f => f.team == t2.team)[keyName].find(p => p.bpName == t2.bpName).bpName);

					matches.push({
						p1: firstPlayer,
						p2: secondPlayer,
						won: firstPlayer === 'bye' ? secondPlayer : (secondPlayer === 'bye' ? firstPlayer : ''),
						p1Score: 0,
						p2Score: 0
					})
					incPlayers.add(matchPlayers.p1);
					incPlayers.add(matchPlayers.p2);
				}
			}
		} else {
			for (let i = 0; i < players.length; i++) {
				const t1 = players[i];
				let firstPlayer = teamsX.find(f => f.team == t1.team)[keyName]
					.find(p => p.bpName == t1.bpName).bpName;
				for (let j = i + 1; j < players.length; j++) {
					const t2 = players[j];
					let secondPlayer = teamsX.find(f => f.team == t2.team)[keyName]
						.find(p => p.bpName == t2.bpName).bpName;

					// console.log(' second: ', teamsX.find(f => f.team == t2.team)[keyName], ' t2: ', t2, ' secondPlayer: ', secondPlayer);
					// console.log('i: ', i, ' t1: ', t1, ' firstPlayer: ', firstPlayer, ' t2: ', t2, ' secondPlayer: ', secondPlayer);
					matches.push({
						p1: firstPlayer,
						p2: secondPlayer,
						won: '',
						p1Score: 0,
						p2Score: 0
					});
				}
			}
		}

		// allSchedule[keyName][stage.key] = {
		// 	name: stage.name,
		// 	key: stage.key,
		// 	limit: stage.knockOut ? matches.length : stage.limit,
		// 	matches
		// };
		schedule[keyName][stage.key]["matches"] = matches;
	}
}

