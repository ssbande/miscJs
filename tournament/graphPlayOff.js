function loadMatchesNew() {
  // men's Singles 
  // order the stages in type - men Singles > RR - QF - SF -FF
  let orderedStages = [], finalHtml = '';
  for (const key in schedule.menSingles) {
    orderedStages[schedule.menSingles[key].order - 1] = {[key]: schedule.menSingles[key].matches};
  }

  console.log(orderedStages);
  let colHtml = '', headHtml = '';

  for (let i = 0; i < orderedStages.length; i++) {
    const stageName = Object.keys(orderedStages[i])[0];
    const stageValues = orderedStages[i][stageName];

    if(stageValues.length % 2 !== 0) {
      stageValues.push({
        won: "-- BYE --"
      });
    }

    headHtml += `<div class="col">${stageName}</div>`;
    // colHtml += `<div class="col">`
    let currentColValues = '', prevColValues = '', nextColValues ='';
    // for (let j = 0;  j < stageValues.length; j++) {
    //   currentColValues += `
    //     <div class="row playerContainer ${stageName}">
    //       <div class="col">${stageValues[j].won}</div>
    //     </div>
    //   `
    // }

    if(i < orderedStages.length - 1) {
      const nextStageName = Object.keys(orderedStages[i+1])[0];
      const nextStageValues = orderedStages[i+1][nextStageName];

      for (let j = 0;  j < nextStageValues.length; j++) {
        nextColValues += `
          <div class="row playerContainer ${nextStageName}">
            <div class="col-md-4 connector" style="border: 1px solid black">A</div>
          </div>
        `

      currentColValues += `
        <div class="row playerContainer ${stageName}">
          <div class="col-md-8" style="border: 1px solid black">${nextStageValues[j].p1}</div>
        </div>
        <div class="row playerContainer ${stageName}">
          <div class="col-md-8" style="border: 1px solid black">${nextStageValues[j].p2}</div>
        </div>
      `
      }
    }

    if(i == 0) {
      colHtml += `
        <div class='col'>${currentColValues}</div>
        <div class='col'>${nextColValues}</div>
      `
    } else if(i == orderedStages.length - 1) {
      colHtml += `
        <div class='col'>${prevColValues}</div>
        <div class='col'>${currentColValues}</div>
      `
    } else {
      colHtml += `
        <div class='col'>${prevColValues}</div>
        <div class='col'>${currentColValues}</div>
        <div class='col'>${nextColValues}</div>
      `
    }

    // colHtml += `</div>`

    console.log('stageName: ', stageName, ' stageValues: ', stageValues);
  }

  finalHtml += `<div class="row heading" id="headers">${headHtml}</div>
    <div class="row playOffChart">${colHtml}</div>`;
  $('#stages').append(finalHtml);
}