var teams = [
  { id: 1, team: 'A', 
    menDoubles: [], 
    womenDoubles: [], 
    mixDoubles: [], 
    players: [
      { id: 1, name: 'A1', sex: 'M', history: [], points: 0 }, 
      { id: 2, name: 'A2', sex: 'M', history: [], points: 0 }, 
      { id: 3, name: 'A3', sex: 'F', history: [], points: 0 }] },
  { id: 2, team: 'B', 
    menDoubles: [], 
    womenDoubles: [], 
    mixDoubles: [], 
    players: [
      { id: 1, name: 'B1', sex: 'M', history: [], points: 0 }, 
      { id: 2, name: 'B2', sex: 'F', history: [], points: 0 }, 
      { id: 3, name: 'B3', sex: 'M', history: [], points: 0 }] },
  { id: 3, team: 'C', 
    menDoubles: [], 
    womenDoubles: [], 
    mixDoubles: [],
    players: [
      { id: 1, name: 'C1', sex: 'M', history: [], points: 0 }, 
      { id: 3, name: 'C3', sex: 'M', history: [], points: 0 }, 
      { id: 4, name: 'C4', sex: 'M', history: [], points: 0 }, 
      { id: 5, name: 'C5', sex: 'M', history: [], points: 0 }, 
      { id: 6, name: 'C6', sex: 'M', history: [], points: 0 }, 
      { id: 2, name: 'C2', sex: 'F', history: [], points: 0 }] },
  { id: 4, team: 'D', 
    menDoubles: [], 
    womenDoubles: [], 
    mixDoubles: [],
    players: [
      { id: 1, name: 'D1', sex: 'F', history: [], points: 0 }, 
      { id: 2, name: 'D2', sex: 'F', history: [], points: 0 }, 
      { id: 3, name: 'D3', sex: 'F', history: [], points: 0 }, 
      { id: 4, name: 'D4', sex: 'F', history: [], points: 0 }] }
]

var config = {
  startDate: Date.now(),
  days: 2,
  stages: [
    { name: 'Round Robin', pCount: Infinity, limit: 8, knockOut: false, key: 'RR' },
    { name: 'Quater Finals', pCount: 8, limit: 4, knockOut: true, key: 'QF' },
    { name: 'Semi Finals', pCount: 4, limit: 2, knockOut: true, key: 'SF' },
    { name: 'Finals', pCount: 2, limit: 1, knockOut: true, key: 'FF' },
  ],
  maxScore: 6
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