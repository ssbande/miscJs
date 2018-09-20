let names = [];
let winnersCurrent = [];
let stages =['RR','QF','SF','FF']
let classNames = {
    RR:'QF',
    QF:'SF',
    SF:'FF'
}
function loadMatches() {
    var menSingles = schedule.menSingles;
    let newStages = [...stages];
    console.log(menSingles)
    stages.forEach(s => {
        let ind = 0;
        if (!menSingles[s]) {
            ind = newStages.indexOf(s);
            newStages.splice(ind, 1);
        }
    })

    newStages.forEach(stage => {

        $("#headers").append(`<div class="col col-md-${12 / newStages.length}">${menSingles[stage].name}</div>`);
        switch (stage) {

            case 'RR':
                getPlayers(stage, menSingles)
                render(names, stage, false, true);
                break;
            case 'QF':
                let winners = [...winnersCurrent];
                winnersCurrent = [];
                getPlayers(stage, menSingles);
                winnersCurrent.length % 2 !== 0 && winnersCurrent.push({ name: 'bye', points: '' });
                
                if (newStages.indexOf('RR') !== -1)
                    render(winners, stage, true, true);
                else
                    render(names, stage, false, true);
                break;
            case 'SF':
                let winnersSF = [...winnersCurrent];
                winnersCurrent = [];
                getPlayers(stage, menSingles)
                if (newStages.indexOf('QF') !== -1)
                    render(winnersSF, stage, true, true);
                else
                    render(names, stage, false, true);
                break;
            case 'FF':
                winnersCurrent = [];
                getPlayers(stage, menSingles)
                if (newStages.indexOf('SF') !== -1)
                    render(winnersCurrent, stage, true, false);
                else
                    render(winnersCurrent, stage, false, false);
                break;
        }
    })
}
function getPlayers(stage, menSingles) {
    console.log(stage,menSingles)
    menSingles[stage == 'FF' ? stage : classNames[stage]].matches.forEach(i => {
        names.push({ name: i.p1, points: i.p1Score }, { name: i.p2, points: i.p2Score });
        winnersCurrent.push({ name: i.won, points: i.p1Score });
    })
}
function hoverIn(e) {
    let className = $(e).attr('class');
    console.log(className)
    $('.' + className).addClass('hover')
}
function hoverOut(e) {
    let className = $(e).attr('class').split(" ")[0];
    $('.' + className).removeClass('hover')
}
function renderLeft(count, stage, colWidth) {
    let html = `<div class="col col-md-${colWidth}">
        <div class="${stage} connect left">`
    for (let i = 0; i < count; i++) {
        html += `<div class="outerDiv">
        <div></div>
    </div>`
    }
    html += `</div>
    </div>`;
    $(`#${stage}container`).before(html);
}

function render(winners, stage, left, right) {
    let initialHtml = `<div class="col" id=${stage}></div>`
    let colWidth = left == true && right == true ? 2 : 4;
    $("#stages").append(initialHtml);
    let html = `
    <div class="row" >
        <div class="col col-md-8" id=${stage}container>
            <div class="${stage} content">`
    winners.forEach(element => {
        html += `<div  class="outerDiv">
        <div 
        class="${element.name.split(" ").join("-")}" 
            onmouseover="hoverIn(this)" onmouseout="hoverOut(this)">
            ${element.name.toUpperCase()}
            </div>
    </div>`;
    });
    html += `</div>
    </div>
</div>`;
    $(`#${stage}`).append(html);
    right && renderRight(winners.length / 2, stage, colWidth);
    left && renderLeft(winners.length, stage, colWidth);
}

function renderRight(count, stage, colWidth) {
    let html = `<div class="col col-md-${colWidth}">
        <div class="${classNames[stage]} connect right">`
    for (let i = 0; i < count; i++) {
        html += `<div class="outerDiv">
        <div></div>
    </div>`
    }
    html += `</div>
    </div>`;
    $(`#${stage}container`).after(html);
}