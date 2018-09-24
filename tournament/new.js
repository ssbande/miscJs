// $(document).ready(() => {
//   $("#stages").html("");
//   graphPlayOffs();
// });

function graphPlayOffs() {
  $("#playOffsEmptyInfo").hide();
  $("#playOffsInfo").show();
  $("#playOffsInfo").html("");
  let finalHtml = `<div class="container">`; // Creating the main container
  let orderedStages = []; // Getting all the stages in ordered fashion for the passed type.

  for (const key in schedule.menSingles) {
    if (key !== 'RR')
      orderedStages[schedule.menSingles[key].order - 1] = { [key]: schedule.menSingles[key].matches };
  }

  orderedStages.push({
    WW: schedule.menSingles['FF'].matches
  })

  orderedStages = orderedStages.filter(x => x);
  console.log('orderedStages: ', orderedStages);

  // Looping through the ordered stages. 
  let headSection = `<div class="row" class="headings">`;
  let colsSection = `<div class="row">`
  for (let i = 0; i < orderedStages.length; i++) {
    const stage = orderedStages[i];
    const stageCode = Object.keys(stage)[0]; // Getting the stage Name like - RR, QF, SF, FF
    const stageName = getStageNameFromCode(stageCode); // Getting full Name of the stage from code.
    const stageValues = stage[stageCode]; // Getting the match values for respective stages.


    


    // Create Heading section, with a separator.
    headSection += `<div class="col text-center">${stageName}</div>`;

    // Create Columns Section. Further loop on the values and append data to it.
    colsSection += `
      <div class="col container">
      <div class="row canvasHeight">
    `;

    let playerSection = `<div class="col-sm-8 poCol">`, leftLinks = '', rightLinks = '';
    let prevValuesDone = false;
    for (let j = 0; j < stageValues.length; j++) {
      const match = stageValues[j];
      console.log('i: ', i);

      if (i == 0) {
        // First Stage 
        if (j == 0) {
          rightLinks += `<div class="col-sm-4 poCol">`
        }
        playerSection += `<div class="player">${match.p1}</div><div class="player">${match.p2}</div>`;

        rightLinks += `<div class="${stageCode} rightLink"></div>`
        if (j == stageValues.length - 1) {
          playerSection += `</div>`;
          rightLinks += `</div>`;
        }

      } else if (i == orderedStages.length - 1) {
        // Last Stage 
        const prevStage = orderedStages[i - 1];
        const prevStageCode = Object.keys(prevStage)[0]; // Getting the stage Name like - RR, QF, SF, FF
        const prevStageValues = prevStage[prevStageCode];
        const prevWinners = prevStageValues.map(m => (m.won));
        console.log('last Element: ', orderedStages[i - 1], 'prevStageCode: ', prevStageCode, ' prevStageValues: ', prevStageValues, ' prevWinners: ', prevWinners);

        if (j == 0) {
          leftLinks += `<div class="col-sm-4 poCol">`
        }
        playerSection += `<div class="player">${prevWinners[0]}</div>`;
        leftLinks += `<div class="leftLink"></div>`
        if (j == stageValues.length - 1) {
          playerSection += `</div>`;
          leftLinks += `</div>`;
        }

      } else {
        // All other intermediate stages
        const prevStage = orderedStages[i - 1];
        const prevStageCode = Object.keys(prevStage)[0];
        const prevStageValues = prevStage[prevStageCode];
        const prevWinners = prevStageValues.map(m => (m.won));



        const nextStage = orderedStages[i + 1];
        const nextStageCode = Object.keys(nextStage)[0];
        const nextStageValues = nextStage[nextStageCode];

        if (j == 0) {
          leftLinks += `<div class="col-sm-2 poCol">`
          rightLinks += `<div class="col-sm-2 poCol">`
        }

        if (!prevValuesDone) {
          console.log('prevWinners.length: ', prevWinners.length, prevWinners);
          for (let k = 0; k < prevWinners.length; k++) {
            prevValuesDone = true;
            const element = prevWinners[k];
            leftLinks += `<div class="leftLink"></div>`;
            playerSection += `<div class="player">${prevWinners[k]}</div>`;
            if (prevWinners.length % 2 !== 0 && k == prevWinners.length - 1) {
              playerSection += `<div class="player">bye</div>`;
            }
          }
        }

        for (let k = 0; k < nextStageValues.length; k++) {
          rightLinks += `<div class="${stageCode} rightLink"></div>`;
        }

        if (j == stageValues.length - 1) {
          playerSection += `</div>`;
          leftLinks += `</div>`;
          rightLinks += `</div>`;
        }
      }
    }

    colsSection += `${leftLinks}${playerSection}${rightLinks}`;
    colsSection += `</div></div>`
  }

  headSection += `</div><div class="row rowSeparator"></div>`
  colsSection += `</div>`
  finalHtml += `${headSection}${colsSection}</div>`;
  $('#playOffsInfo').append(finalHtml);
}