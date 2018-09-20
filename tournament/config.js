var config = {
  startDate: Date.now(),
  days: 2,
  stages: [
    { name: 'Round Robin', pCount: Infinity, limit: 8, knockOut: true, key: 'RR' },
    { name: 'Quater Finals', pCount: 8, limit: 4, knockOut: true, key: 'QF' },
    { name: 'Semi Finals', pCount: 4, limit: 2, knockOut: true, key: 'SF' },
    { name: 'Finals', pCount: 2, limit: 1, knockOut: true, key: 'FF' }
  ],
  maxScore: 6,
  nameRegex:'^(?![\s.]+$)[a-zA-Z\s]{3,10}$',
  tournamentName: 'Bande',
  playerNumber:5,
  isTournamentStarted: false,
  isTournamentEnded: false
};

var schedule = {
  menSingles: {},
  womenSingles: {},
  menDoubles: {},
  womenDoubles: {},
  mixDoubles: {}
}

var allSchedule = {
  menSingles: {},
  womenSingles: {},
  menDoubles: {},
  womenDoubles: {},
  mixDoubles: {}
}

var conditions = {
  menSingles: 'M',
  womenSingles: 'F',
  menDoubles: 'DM',
  womenDoubles: 'DF',
  mixDoubles: 'MD'
};

var typeEnum = {
  menSingles: 'Men Singles',
  womenSingles: 'Women Singles',
  menDoubles: 'Men Doubles',
  womenDoubles: 'Women Doubles',
  mixDoubles: 'Mix Doubles'
};


function getTwoRandomNos(len) {
  let p1 = Math.floor(Math.random() * len);
  let p2 = Math.floor(Math.random() * len);
  while (p1 == p2) {
    p2 = Math.floor(Math.random() * len);
  }

  return {
    p1, p2
  }
}

function getMatchType(type, allSchedule) {
  let matchType = '';
  if (type == 'M') {
    matchType = 'menSingles';
  } else if(type == 'F') {
    matchType = 'womenSingles';
  } else if(type == 'DM') {
    matchType = 'menDoubles';
  } else if(type == 'DF') {
    matchType = 'womenDoubles';
  } else if (type == 'MD') {
    matchType = 'mixDoubles';
  }

  return allSchedule[matchType];
}

