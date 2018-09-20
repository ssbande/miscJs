function loadMatchesNew() {
  // men's Singles 
  // order the stages in type - men Singles > RR - QF - SF -FF
  let orderedStages = [], finalHtml = '';

  finalHtml += `<div class="row heading" id="headers"></div>
    <div class="row" style="height: 400px; width: 100%; text-align: center">`;

  for (const key in schedule.menSingles) {
    orderedStages[schedule.menSingles[key].order - 1] = {[key]: schedule.menSingles[key].matches};
  }

  console.log(orderedStages);
  let colHtml = ''

  for (let i = 0; i < orderedStages.length; i++) {
    const stageName = Object.keys(orderedStages[i])[0];
    const stageValues = orderedStages[i][stageName];

    colHtml += `<div class="col">${stageName}</div>`;

    console.log('stageName: ', stageName, ' stageValues: ', stageValues);
  }

  $('#playOffStages').append(finalHtml + colHtml + '</div>');
}