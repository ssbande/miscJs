console.log('Tennis Tournament', JSON.stringify(teamsX));

let men = [], women = [], menDoubles = [], womenDoubles = [], mixDoubles = [];

teams.forEach(team => {
  team.players.forEach(p => {
    if (p.sex == 'M') {
      p['team'] = team.team; p['playerId'] = men.length + 1;
      men.push(p)
    }

    if (p.sex == 'F') {
      p['team'] = team.team; p['playerId'] = women.length + 1;
      women.push(p)
    }
  });
});

function getDoubles(data, team) {
  if (data.teamSize > 0) {
    let i = 0;
    while (i < data.teamSize) {
      let matchPlayers = getTwoRandomNos(data.size);
      if (!team[data.ar].some(x => x.player1 == matchPlayers.p1 || x.player2 == matchPlayers.p1 ||
        x.player1 == matchPlayers.p2 || x.player2 == matchPlayers.p2)) {
        team[data.ar].push({
          player1: matchPlayers.p1,
          player1Name: team.players[matchPlayers.p1].name,
          player2: matchPlayers.p2,
          player2Name: team.players[matchPlayers.p2].name,
          bpName: team.players[matchPlayers.p1].name + ' + ' + team.players[matchPlayers.p2].name,
          bpNameAlt: team.players[matchPlayers.p2].name + ' + ' + team.players[matchPlayers.p1].name,
          team: team.team,
          type: data.type,
          points: 0,
          history: []
        })
      }

      i = team[data.ar].length;
    }
  }
}

function createDoubles(team) {
  let men = team.players.filter(f => f.sex == 'M');
  let women = team.players.filter(f => f.sex == 'F');

  let menTeamSize = men.length % 2 == 0 ? men.length / 2 : (men.length - 1) / 2;
  let womenTeamSize = women.length % 2 == 0 ? women.length / 2 : (women.length - 1) / 2;

  let teamData = [
    { teamSize: menTeamSize, size: men.length, ar: 'menDoubles', type: 'DM' },
    { teamSize: womenTeamSize, size: women.length, ar: 'womenDoubles', type: 'DF' }
  ];

  teamData.forEach(td => getDoubles(td, team));
}

function isMixedPair(pair, team) {
  let res = (team.players[pair.p1].sex == 'F' && team.players[pair.p2].sex == 'M') ||
    (team.players[pair.p1].sex == 'M' && team.players[pair.p2].sex == 'F');
  return res;
}

function createMixDoubles(team) {
  let men = team.players.filter(f => f.sex == 'M');
  let women = team.players.filter(f => f.sex == 'F');
  let mdTeamSize = men.length * women.length;

  // men == 0, women == 1
  let randomGp, staticGp;
  if(men.length < women.length) {
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
    if(!mdContains) {
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

function generateScheduleForDoubles(players, keyName) {
  const stage = config.stages.find(s => s.limit < players.length);
  let matches = [];

  // console.log(' doubles from gen schedule: ', keyName,  players);

  if(stage.knockOut) {
    if (players.length % 2 !== 0) {
      players.push({ id: 1, name: 'bye', sex: '', history: [], team: -1, playerId: players.length })
    }

    let incPlayers = new Set();
    while (incPlayers.size < players.length) {
      let matchPlayers = getTwoRandomNos(players.length);
      while (!incPlayers.has(matchPlayers.p1) && !incPlayers.has(matchPlayers.p2)) {
        let t1 = players[matchPlayers.p1], t2 = players[matchPlayers.p2];
        let firstPlayer = t1.name == 'bye' ? 'bye' : ( 
          teams.find(f => f.team == t1.team)[keyName].find(p => p.bpName == t1.bpName).bpName);

        let secondPlayer = t2.name == 'bye' ? 'bye' : (
          teams.find(f => f.team == t2.team)[keyName].find(p => p.bpName == t2.bpName).bpName); 

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
      let firstPlayer = teams.find(f => f.team == t1.team)[keyName]
                             .find(p => p.bpName == t1.bpName).bpName;
      for (let j = i + 1; j < players.length; j++) {
        const t2 = players[j];
        let secondPlayer = teams.find(f => f.team == t2.team)[keyName]
                                .find(p => p.bpName == t2.bpName).bpName;
        
        // console.log(' second: ', teams.find(f => f.team == t2.team)[keyName], ' t2: ', t2, ' secondPlayer: ', secondPlayer);
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

  allSchedule[keyName][stage.key] = {
    name: stage.name,
    key: stage.key,
    limit: stage.knockOut ? matches.length : stage.limit,
    matches
  };
}

function generateScheduleForSingles(players, keyName) {
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

  allSchedule[keyName][stage.key] = {
    name: stage.name,
    key: stage.key,
    limit: stage.knockOut ? matches.length : stage.limit,
    matches
  };
}

function playMatchesDoubles(stageKey, type) {
  if (type == 'M' || type == 'F') {
    console.log('returning as incorrect method called');
    return false;
  }

  let keyName = type == 'DM' ? 'menDoubles' : (type == 'DF' ? 'womenDoubles' : 'mixDoubles');
  let allPlayers = [];
  teams.forEach(team => {
    allPlayers = allPlayers.concat(team[keyName]);
  });


  // console.log('allPlayers: ', allPlayers, type, keyName, allSchedule);
  let matchType = getMatchType(type, allSchedule);
  let matches = matchType[stageKey].matches, winners = [];
  let stage = config.stages.find(s => s.key == stageKey);

  matches.forEach((match, index) => {
    let winIndex = Math.floor(Math.random() * 2);
    let loseIndex = !winIndex | 0;

    let pW = 'p' + (winIndex + 1), pL = 'p' + (loseIndex + 1);
    let initialWinner = match[pW];
    console.log(' pw: ', pW, 'pL: ', pL, ' match[pW]: ', match[pW], ' match[pL]: ', match[pL]);

    if (!match.won) {
      match.won = match[pW];
    } else {
      if(match[pW] == 'bye') {
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

    if(initialWinner == 'bye') { 
      match[pW] = 'bye';
      match[pL + 'Score'] = winnerScore;
      match[pW + 'Score'] = 0;
    } else {
      match[pW + 'Score'] = winnerScore;
      match[pL + 'Score'] = loserScore;
    }
  });

  let roundWinners = winners.map((w, i) => ({ id: i, 
    bpName: w.bpName, 
    bpNameAlt: w.bpNameAlt, 
    points: w.points, 
    history: w.history, 
    team: w.team,
    player1: w.player1,
    player2: w.player2,
    player1Name: w.player1Name,
    player2Name: w.player2Name}))
    .sort((x, y) => y.points - x.points)
    .filter(f => f.id < stage.limit);


  
  
  
  
  // console.log(' roundWinners: ', roundWinners);
  
  
  matchType[stageKey]['winners'] = roundWinners;
  // console.log('Match Type: ', matchType, matchType[stageKey]);
  
  console.log('All Schedule after ', stageKey, allSchedule, teams);
  if (stageKey !== 'FF') {
    generateScheduleForDoubles(roundWinners, keyName)
  }
}

function playMatchesSingles(stageKey, type) {
  if (type !== 'M' && type !== 'F') {
    console.log('returning as incorrect method called');
    return false;
  }

  let keyName = type == 'M' ? 'menSingles' : 'womenSingles';
  let allPlayers = [];
  teams.forEach(team => {
    allPlayers = allPlayers.concat(team.players);
  });

  let matchType = getMatchType(type, allSchedule);

  let matches = matchType[stageKey].matches, winners = [];
  let stage = config.stages.find(s => s.key == stageKey);
  matches.forEach((match, index) => {
    let winIndex = Math.floor(Math.random() * 2);
    let loseIndex = !winIndex | 0;
    let pW = 'p' + (winIndex + 1), pL = 'p' + (loseIndex + 1);
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

    match[pW + 'Score'] = winnerScore;
    match[pL + 'Score'] = loserScore;
  });

  let roundWinners = winners.map((w, i) => ({ id: i, name: w.name, points: w.points, history: w.history, sex: w.sex, team: w.team, playerId: w.playerId })).sort((x, y) => y.points - x.points).filter(f => f.id < stage.limit);

  matchType[stageKey]['winners'] = roundWinners;
  console.log('All Schedule after ', stageKey, allSchedule, teams);
  if (stageKey !== 'FF') {
    generateScheduleForSingles(roundWinners, keyName)
  }
}

function generateMatchSchedule() {
  for (const key in schedule) {
    let arrayToFilter = key.includes('Singles') ? 'players' : (key.includes('mix') ? 'mixDoubles' : (key.includes('women') ? 'womenDoubles' : 'menDoubles'));
    let propToFilter = key.includes('Singles') ? 'sex' : 'type';
    let players = teams.map(t => (t[arrayToFilter].filter(f => f[propToFilter] == conditions[key]).length)).reduce((x, y) => x + y);

    // if(key.includes('mix')) {
    //   console.log('players: ', teams.map(t => (t[arrayToFilter].filter(f => f[propToFilter] == conditions[key]))));
    // }
    let playerCount = players, matches = [];

    config.stages.forEach(stage => {
      if (stage.limit < players) {
        schedule[key] = {};
        let srrPlayers = players % 2 == 0 ? players - 1 : players;
        let m = stage.knockOut ? (players % 2 == 0 ? players / 2 : (players + 1) / 2) : Array.from({ length: srrPlayers }, (v, k) => k).reduce((x, y) => x + y, 0);
        stage.pCount = players;
        matches.push(Object.assign({}, stage, { matches: m }));
        players = stage.knockOut ? m : stage.limit;
        schedule[key] = matches;
      }
    });
  }
}

function createLinksAsPerMatches() {
  for (const key in schedule) {
    let k = conditions[key].toLowerCase() + 'Links';
    let method = key.includes('Double') ? 'playMatchesDoubles' : 'playMatchesSingles';
    // console.log('key: ', key, method)
    schedule[key].forEach(element => {
      document.getElementById(k).innerHTML += '<a href="#" onclick="' + method + '(\'' + element.key.trim() + '\', \'' + conditions[key] + '\')">Play ' + element.name + '</a>'
    });
  }
}

teams.forEach(team => {
  createDoubles(team);
  createMixDoubles(team);
  team.menDoubles.forEach((p, i) => menDoubles.push(Object.assign({}, p, {team: team.team, subTeam: team.team + '_' + (i+1), dtId: menDoubles.length + 1})));
  team.womenDoubles.forEach((p, i) => womenDoubles.push(Object.assign({}, p, {team: team.team, subTeam: team.team + '_' + (i+1), dtId: menDoubles.length + 1})));
  team.mixDoubles.forEach((p, i) => {
    // console.log('p: ', p);
    mixDoubles.push(Object.assign({}, p, {team: team.team, subTeam: team.team + '_' + (i+1), dtId: menDoubles.length + 1}))
    // console.log('mix Doubles: ', mixDoubles);
  });
})

// generateMatchSchedule(); // creates >> schedule
// createLinksAsPerMatches();

generateScheduleForSingles(men, 'menSingles');
generateScheduleForSingles(women, 'womenSingles');
generateScheduleForDoubles(menDoubles, 'menDoubles');
generateScheduleForDoubles(womenDoubles, 'womenDoubles');
generateScheduleForDoubles(mixDoubles, 'mixDoubles');

console.log(' Teams: ', teams);
console.log('Schedule: ', schedule);
console.log('All Schedule: ', allSchedule);