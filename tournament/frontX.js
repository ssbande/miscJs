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
	totalMatches: 0,
	showStageDetails: function showStageDetails(key, stage, stageName) {
		$("#playOffTitle").html("");
		$("#playOffTblBody").html("");
		$("#playOffTitle").append("View Playoffs - ").append(key).append(" >> " + stageName);
		console.log(schedule[key][stage].matches)
		schedule[key][stage].matches.forEach((match, i) => {
			let x = `<tr>
				<td>${i + 1}</td>
				<td>${match.t1}</td>
				<td class="font-weight-bold text-orange">${match.p1}</td>
				<td class="font-weight-bold">Vs</td>				
				<td class="font-weight-bold text-orange">${match.p2}</td>
				<td>${match.t2}</td>
				<td class="text-orange">${match.won == "" ? '--' : match.won}</td>
			</tr>`;
			$("#playOffTblBody").append(x);
		});
	},

	createInfoRow: function createInfoRow(key) {
		let objLen = Object.keys(schedule[key]).length;
		let res = "";

		if (objLen == 0) {
			res += `No Matches for ${key}`;
			return `<div class="row"><div class="col-sm-12">${res}</div></div>`;
		}

		for (const st in schedule[key]) {
			res += `<div class="row">
				<div class="col-sm-8 a-mute-orange" onClick="ScheduleMethods.showStageDetails('${key}', '${st}', '${schedule[key][st].name}')" data-toggle="modal" data-target="#stageDetails">${schedule[key][st].name}</div>
				<div class="col-sm-4 text-right">${schedule[key][st].matchCount}</div>
			</div>`
		}

		return res;
	},

	generateMatchSchedule: function generateMatchSchedule() {
		if (teamsX.length == 0) {
			
			$("#scheduleGeneateError").html("There are no teams yet. Please access Menu for the same and then create schedule.").show();
			return false;
		}


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
				} else if(players===1 && stage.key==='FF') {
					schedule[key] = {};
					count++;

					let m = stage.knockOut ? (players % 2 == 0 ? players / 2 : (players + 1) / 2) : Array.from({ length: players }, (v, k) => k).reduce((x, y) => x + y, 0);
					stage.pCount = players;
					matches[stage.key] = (Object.assign({}, stage, { matchCount: m, order: count }));
					players = stage.knockOut ? m : stage.limit;
					schedule[key] = matches;
				}
			});
			console.log('schedule from frontX: ', schedule);
			if (key.includes('Singles')) {
				ScheduleMethods.generateScheduleForSingles(keyPlayers, key);
			} else {
				ScheduleMethods.generateScheduleForDoubles(keyPlayers, key);
			}
		}

		//console.log('schedule from frontX: ', schedule);
		let startDate = new Date(config.startDate);
		let endDate = new Date(startDate);
		endDate.setDate(endDate.getDate() + config.days);
		let totalMatches = 0;
		for (const mt in schedule) {
			$(`#${mt}Info`).append(ScheduleMethods.createInfoRow(mt))
			for (const st in schedule[mt]) {
				totalMatches += schedule[mt][st].matchCount;
			}
		}

		$("#tStartDate").html(startDate.toDateString());
		$("#tEndDate").html(endDate.toDateString());
		$("#tTeamNo").html(teamsX.length);
		$("#tMatchNo").html(totalMatches);
		$("#scheduleListInfo").show();
		$("#scheduleListEmptyInfo").html("Click on the stage names to view the detailed play-offs.");
		ScheduleMethods.totalMatches = totalMatches;
	},

	generateScheduleForSingles: function generateScheduleForSingles(players, keyName) {
		//console.log("players",players,keyName)
		const stage = config.stages.find(s => s.limit < players.length);
		stage.pCount = players.length;
		let matches = [];

		// Select two random players from the players length;
		if (stage.knockOut) {
			if (players.length % 2 !== 0) {
				players.push({ id: 999998, name: 'bye', sex: '', history: [], team: '--', teamName: '--', playerId: players.length })
			}

			let incPlayers = new Set();
			while (incPlayers.size < players.length) {
				let matchPlayers = getTwoRandomNos(players.length);
				while (!incPlayers.has(matchPlayers.p1) && !incPlayers.has(matchPlayers.p2)) {
					console.log("singles bye",players,matchPlayers);
					matches.push({
						p1: players[matchPlayers.p1].name,
						p2: players[matchPlayers.p2].name,
						won: players[matchPlayers.p1].name === 'bye' ? players[matchPlayers.p2].name : (players[matchPlayers.p2].name === 'bye' ? players[matchPlayers.p1].name : ''),
						t1: players[matchPlayers.p1].teamName,
						t2: players[matchPlayers.p2].teamName,
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
						t1: player1.teamName,
						t2: player2.teamName,
						p1Score: 0,
						p2Score: 0
					});
				}
			}
		}

		schedule[keyName][stage.key]["matches"] = matches;
	},

	generateScheduleForDoubles: function generateScheduleForDoubles(players, keyName) {
		let stage = config.stages.find(s => s.limit < players.length);
		let matches = [];

		if (!stage) {
			stage=config.stages.find(s => s.key=='FF');
		}

		console.log(' doubles from gen schedule: ', keyName, stage,players);
		
		if (stage.knockOut) {
			if (players.length % 2 !== 0) {
				players.push({ id: 999999, name: 'bye', sex: '', history: [], team: '--', teamName: '--', playerId: players.length })
			}

			let incPlayers = new Set();
			while (incPlayers.size < players.length) {
				let matchPlayers = getTwoRandomNos(players.length);
				while (!incPlayers.has(matchPlayers.p1) && !incPlayers.has(matchPlayers.p2)) {
					let t1 = players[matchPlayers.p1], t2 = players[matchPlayers.p2];
					//console.log('t1: ', t1, ' t2: ', t2)
					let firstPlayer = t1.name == 'bye' ? 'bye' : (
						teamsX.find(f => f.team == t1.team)[keyName].find(p => p.bpName == t1.bpName).bpName);

					let secondPlayer = t2.name == 'bye' ? 'bye' : (
						teamsX.find(f => f.team == t2.team)[keyName].find(p => p.bpName == t2.bpName).bpName);

					matches.push({
						p1: firstPlayer,
						p2: secondPlayer,
						won: firstPlayer === 'bye' ? secondPlayer : (secondPlayer === 'bye' ? firstPlayer : ''),
						t1: t1.team,
						t2: t2.team,
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

		schedule[keyName][stage.key]["matches"] = matches;
	}
}

const PlayMethods = {
	playAll: function playAll(e) {
		e.stopPropagation();
		e.preventDefault();
		// alert('play all matches here ... ');
		config.isTournamentEnded = true;
		// $("#tStarted").hide("slow");
		$("#runAllMatches").hide("slow");
		$("#tourProgress").show("slow");

		// $("#tEnded").show("slow");

		let allMatches = [];
		for (const key in schedule) {
			let keyName = typeEnum[key];
			let keyShort = conditions[key];
			let isSingle = key.includes('Singles');
			for (const stage in schedule[key]) {
				allMatches.push(Object.assign({}, schedule[key][stage], { matchTypeFull: keyName, matchType: keyShort, isSingle }));
			}
		}

		for (let i = 0; i < allMatches.length; i++) {
			let type = allMatches[i]
			setTimeout(() => {
				if (type.isSingle) {
					PlayMethods.playMatchesSingles(type.key, type.matchType);
				} else {
					PlayMethods.playMatchesDoubles(type.key, type.matchType);
				}

				let percent = 100 / allMatches.length * (i + 1);
				$("#tourProgress .progress-bar").css("width", percent + "%");
				$("#tourProgressCaption").html(`Playing ${type.matchTypeFull} - ${type.name} + ${ScheduleMethods.totalMatches}`);

				if (i == allMatches.length - 1) {
					setTimeout(() => {
						$("#tStarted").hide("slow");
						$("#tEnded").show("slow");
						$("#stats").show("slow");
						Statistics.allTeams();
						Statistics.generateMedalTally();
					}, 1000);
				}
			}, 500 * i);
		}
	},

	playMatchesSingles: function playMatchesSingles(stageKey, type) {
		let keyName = type == 'M' ? 'menSingles' : 'womenSingles';
		let allPlayers = [];
		teamsX.forEach(team => {
			allPlayers = allPlayers.concat(team.players);
		});

		let matchType = getMatchType(type, schedule);

		let matches = matchType[stageKey].matches, winners = [];
		let stage = config.stages.find(s => s.key == stageKey);
		matches.forEach((match, index) => {
			let winIndex = Math.floor(Math.random() * 2);
			let loseIndex = !winIndex | 0;
			let pW = 'p' + (winIndex + 1), pL = 'p' + (loseIndex + 1);
			let initialWinner = match[pW];

			if (!match.won) {
				match.won = match[pW];
			} else {
				match[pW] = match.won;
			}

			let winnerScore = config.maxScore;
			let loserScore = Math.floor(Math.random() * config.maxScore);

			let winnerPresentIndex = winners.findIndex(a => a.name === match[pW]);
			let winner = winnerPresentIndex > -1 ? winners[winnerPresentIndex] : allPlayers.find(a => a.name === match[pW]);
			let loser = allPlayers.find(a => a.name === match[pL]);

			winner.history.push({ stage: stageKey, against: match[pL], winStatus: 1, selfScore: winnerScore, rivalScore: loserScore });
			winner.points = winner.points + 3;

			if (winnerPresentIndex > -1) {
				winners[winnerPresentIndex] = winner;
				allPlayers.find(a => a.name === match[pW]).history.push({ stage: stageKey, against: match[pL], winStatus: 1, selfScore: winnerScore, rivalScore: loserScore });
				allPlayers.find(a => a.name === match[pW]).points += 3;
			} else {
				winners.push(Object.assign({}, winner, { stage: stageKey }));
			}

			if (loser) {
				loser.history.push({ stage: stageKey, against: match[pW], winStatus: 0, selfScore: loserScore, rivalScore: winnerScore });
				loser.points += 0;
			}

			// match[pW + 'Score'] = winnerScore;
			// match[pL + 'Score'] = loserScore;

			if (initialWinner == 'bye') {
				match[pW] = 'bye';
				match[pL + 'Score'] = winnerScore;
				match[pW + 'Score'] = 0;
			} else {
				match[pW + 'Score'] = winnerScore;
				match[pL + 'Score'] = loserScore;
			}
		});

		let roundWinners = winners.map((w, i) => ({ 
			id: i, 
			name: w.name, 
			points: w.points, 
			history: w.history, 
			sex: w.sex,
			teamName: w.teamName, 
			playerId: w.playerId 
		}))
			.sort((x, y) => y.points - x.points)
			.filter((f, i) => i < stage.limit);
			console.log(roundWinners)
		matchType[stageKey]['winners'] = roundWinners
		if (stageKey !== 'FF') {
			ScheduleMethods.generateScheduleForSingles(roundWinners, keyName)
		}
	},

	playMatchesDoubles: function playMatchesDoubles(stageKey, type) {
		let keyName = type == 'DM' ? 'menDoubles' : (type == 'DF' ? 'womenDoubles' : 'mixDoubles');
		let allPlayers = [];
		teamsX.forEach(team => {
			allPlayers = allPlayers.concat(team[keyName]);
		});


		// console.log('allPlayers: ', allPlayers, type, keyName, allSchedule);
		let matchType = getMatchType(type, schedule);
		let matches = matchType[stageKey].matches, winners = [];
		let stage = config.stages.find(s => s.key == stageKey);

		matches.forEach((match, index) => {
			let winIndex = Math.floor(Math.random() * 2);
			let loseIndex = !winIndex | 0;

			let pW = 'p' + (winIndex + 1), pL = 'p' + (loseIndex + 1);
			let initialWinner = match[pW];
			// console.log(' pw: ', pW, 'pL: ', pL, ' match[pW]: ', match[pW], ' match[pL]: ', match[pL]);

			if (!match.won) {
				match.won = match[pW];
			} else {
				if (match[pW] == 'bye') {
					match[pW] = match[pL];
				}
				// match[pW] = match.won;
			}

			let winnerScore = config.maxScore;
			let loserScore = Math.floor(Math.random() * config.maxScore);

			let winnerPresentIndex = winners.findIndex(a => a.bpName === match[pW]);
			let winner = winnerPresentIndex > -1 ? winners[winnerPresentIndex] : allPlayers.find(a => a.bpName === match[pW] || a.bpNameAlt === match[pW]);
			let loser = allPlayers.find(a => a.bpName === match[pL] || a.bpNameAlt === match[pL]);

			winner.history.push({ stage: stageKey, against: match[pL], winStatus: 1, selfScore: winnerScore, rivalScore: loserScore });
			winner.points = winner.points + 3;

			if (winnerPresentIndex > -1) {
				winners[winnerPresentIndex] = winner;
				allPlayers.find(a => a.bpName === match[pW] || a.bpNameAlt === match[pW]).history.push({ stage: stageKey, against: match[pL], winStatus: 1, selfScore: winnerScore, rivalScore: loserScore });
				allPlayers.find(a => a.bpName === match[pW] || a.bpNameAlt === match[pW]).points += 3;
			} else {
				winners.push(Object.assign({}, winner, { stage: stageKey }));
			}

			if (loser) {
				loser.history.push({ stage: stageKey, against: match[pW], winStatus: 0, selfScore: loserScore, rivalScore: winnerScore });
				loser.points += 0;
			}

			if (initialWinner == 'bye') {
				match[pW] = 'bye';
				match[pL + 'Score'] = winnerScore;
				match[pW + 'Score'] = 0;
			} else {
				match[pW + 'Score'] = winnerScore;
				match[pL + 'Score'] = loserScore;
			}
		});

		let roundWinners = winners.map((w, i) => ({
			id: i,
			bpName: w.bpName,
			bpNameAlt: w.bpNameAlt,
			points: w.points,
			history: w.history,
			team: w.team,
			player1: w.player1,
			player2: w.player2,
			player1Name: w.player1Name,
			player2Name: w.player2Name
		}))
			.sort((x, y) => y.points - x.points)
			.filter((f, i) => i < stage.limit);
			// .filter(f => f.id < stage.limit);

		// console.log(' roundWinners: ', roundWinners);
		matchType[stageKey]['winners'] = roundWinners;
		// console.log('Match Type: ', matchType, matchType[stageKey]);

		//console.log('All Schedule after ', stageKey, schedule, teamsX);
		if (stageKey !== 'FF') {
			ScheduleMethods.generateScheduleForDoubles(roundWinners, keyName)
		}
	}
}

const Statistics = {

	allTeams: function () {
		$("#statsListEmptyInfo").hide();
		var options = {
			pieSliceText: 'value',
			// pieStartAngle: 135,
			tooltip: { text: 'value' },
			is3D: true,
			colors: ["#ffdc73", "#ffcf40",  "#ffbf00", "#bf9b30", "#a67c00", "#FFDC73", "#FFCF40", "#FFBF00", "#BF9B30", "#A67C00"],
			legend: {
				width: "10%",
				alignment: "center",
				position: "bottom",
				textStyle: { color: 'whitesmoke', fontName: 'Play', fontSize: '16px' }
			},
			fontName: 'Play', fontSize: '16px',
			backgroundColor: {
				fill: "#343a40"
			},
			chartArea: { left: 30, top: 0, width: '90%', height: '90%' }
		};
		// Define the chart to be drawn.
		// pie chart
		var data = new google.visualization.DataTable();
		let dataX = teamsX.map(team => [team.team, team.players.reduce((sum, item) => sum + item.points, 0)])
		data.addColumn('string', 'Team');
		data.addColumn('number', 'Total Points');
		data.addRows(dataX);
		var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
		chart.draw(data, options);

		let actualData = teamsX.map(team => {
			let history = [];
			for (let i in team) {
				if (team[i].length && typeof team[i] === "object") {
					team[i].map(item => {
						history = [...history, ...item.history]
					})
				}
			}
			return [team.team,
			history.reduce((sum, item) => item.winStatus === 1 ? ++sum : sum += 0, 0),
			history.reduce((sum, item) => item.winStatus === 0 ? ++sum : sum += 0, 0)];
		});

		// bar chart
		var data1 = google.visualization.arrayToDataTable([
			['Team', 'Won', 'Lost'],
			...actualData
		]);

		var options1 = {
			height: 500,
			animation: {
				startup: true,
				easing: "out",
				duration: 5000
			},
			axisTitlesPosition: "none",
			is3D: true,
			hAxis: {
				textStyle: { color: 'whitesmoke', fontName: 'Play', fontSize: '16px' }
			},
			vAxis: {
				gridlines: {
					color: "#6c757d"
				},
				textStyle: { color: 'whitesmoke', fontName: 'Play', fontSize: '16px' }
			},
			backgroundColor: {
				fill: "#343a40"
			},
			colors: ["#ffbf00", "#ffdc73"],
			legend: {
				width: "10%",
				alignment: "center",
				position: "bottom",
				textStyle: { color: 'whitesmoke', fontName: 'Play', fontSize: '16px' }
			},
			fontName: 'Play', fontSize: '16px',
			chartArea: { height: '90%', width: '90%'}
		};

		// var chart1 = new google.charts.Bar(document.getElementById('myBarChart'));
		var chart1 = new google.visualization.ColumnChart(document.getElementById('myBarChart'));

		chart1.draw(data1, options1);


	},

	createWinnerAndRunnerUpRow: function createWinnerAndRunnerUpRow(key) {
		let objLen = Object.keys(schedule[key]).length;
		let res = "";

		if (objLen == 0) {
			res += `No Matches for ${key}`;
			return `<li class="list-group-item list-group-item-light">${res}</li>`;
		}

		let finals = schedule[key]["FF"];
		if (finals) {
			let final = finals.matches[0];
			//console.log('final: ', final);
			let winner = final.won;
			let winTeam = final.won == final.p1 ? final.t1 : final.t2;
			let loseTeam = final.won == final.p1 ? final.t2 : final.t1;
			let runnerUp = final.won == final.p1 ? final.p2 : final.p1;
			res += `<li class="list-group-item list-group-item-light">
			<i class="fas fa-trophy text-orange"></i> ${winner} - ${winTeam}</li>
		<li class="list-group-item list-group-item-light">${runnerUp} - ${loseTeam}</li>`
		}

		return res;
	},

	generateMedalTally: function generateMedalTally() {
		$("#medalListEmptyInfo").hide();
		$("#medalListInfo").show();

		for (const mt in schedule) {
			//console.log(mt);
			$(`#${mt}Medals`).append(Statistics.createWinnerAndRunnerUpRow(mt))
		}


		//console.log('schedule: ', schedule);
	}
}