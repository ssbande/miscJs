let teamsX = [];
let playerCount = 0;
$(document).ready(() => {
  google.charts.load('current', { packages: ['corechart','bar'] });
  $("#tournamentName").html(config.tournamentName);
  $("#tourName1").html(config.tournamentName);
  
  $("#tStarted").hide();
  $("#tEnded").hide();
  $("#tNotStarted").show();
  $("#scheduleGeneateError").html("").hide();
  $("#scheduleListInfo").hide();
  $("#medalListInfo").hide();
  $("#playOffsInfo").hide();

  $(".showGraphicalPlayOff").hide();

  $("#scheduleListEmptyInfo").show();
  $("#statsListEmptyInfo").show();
  $("#medalListEmptyInfo").show();
  $("#playOffsEmptyInfo").show();
  
  $("#runAllMatches").show();
  $("#tourProgress").hide();
  $("#stats").hide();

  $("#menuItems ul li a").bind("mouseenter mouseleave", function () {
    $(this.children[0]).toggleClass("fa-spin text-orange");
  });

  $("#back2Top").click(function (event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 1000);
    return false;
  });

  $(".scrollTo").click(function (event) {
    event.preventDefault();
    let elemId = "#" + this.id.split("_")[0];
    $('html, body').animate({ scrollTop: $(elemId).offset().top }, 1000);
    return false;
  });

  $(window).scroll(function () {
    let height = $(window).scrollTop();
    if (height > 100) {
      $('#back2Top').fadeIn();
    } else {
      $('#back2Top').fadeOut();
    }
  });

  $('#createTeamModal').on('hidden.bs.modal', function (e) {
    $("#team")[0].reset();
    $("#playerAddSection").html("");
    $("#createTeamError").html("").hide();
    playerCount = 0;
  })

  $('#createTeamModal').on('show.bs.modal', function (e) {
    $("#createTeamsModalDialog").show();
  })

  $('#settingsModal').on('hidden.bs.modal', function (e) {
    $("#settings")[0].reset();
    $("#settingsError").html("").hide();
  })

  $('#settingsModal').on('show.bs.modal', function (e) {
    $("#tName").attr("placeholder", config.tournamentName)
    $("#trrKnockOut").attr("checked", config.stages.find(s => s.key == "RR").knockOut)
    $("#pNum").val(config.playerNumber);
    $('#settingsModalDialog').show();
  })

  $('#randomTeamModal').on('hidden.bs.modal', function (e) {
    $("#randomTeam")[0].reset();
    $("#randomTeamError").html("").hide();
  })

  $('#randomTeamModal').on('show.bs.modal', function (e) {
    $("#rTeamModalDialog").show();
    $("#cancelCreateRandomTeams").show();
  })

  $('#viewTeamModal').on('show.bs.modal', function (e) {
    $("#viewTeamError").html("").hide();
    $(`div[id^="#teamEditError"`).html("").hide()
    viewTeams();
  })
  $('#viewWinners').on('show.bs.modal', function (e) {
    // $("#stages").html("");
  })
})

function addPlayerRow() {
  if (playerCount < config.playerNumber) {
    let id = "player" + playerCount;
    let x = `<div id="${id}" class="row mb-2" >
                  <div class="col-md-8"><input pattern="${config.nameRegex}" title="Only alphabets of length from 3 -10" type="text" class="form-control" name="${playerCount}" required id="player${playerCount}Name" placeholder="Player ${playerCount + 1} Name"></div>
                  <div class="col-md-4" style="display: flex">
                    <div class="form-check form-check-inline">
                      <input required class="form-check-input" type="radio" name="${playerCount}" id="r${playerCount}_m" value="M">
                      <label class="form-check-label" for="r${playerCount}_m">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="${playerCount}" id="r${playerCount}_f" value="F">
                      <label class="form-check-label" for="r${playerCount}_f">Female</label>
                    </div></div>
                </div>`;
    $("#playerAddSection").append(x);
    $("#createTeamError").html("").hide();
    playerCount++;
  } else {
    $("#createTeamError").html("Team size limit reached").show();
  }
}

function saveSettings(e) {
  e.preventDefault();

  let serialisedForm = $("#settings").serializeArray();

  if (config.isTournamentStarted) {
    $("#settingsError").html("Sorry ... tournament has begun, no more changes can be done.").show();
    return false;
  }

  let switchKnockOut = serialisedForm.find(s => s.name == "trrKnockOut");
  let playerNos = serialisedForm.find(s => s.name == "pNum");
  let tourName = serialisedForm.find(s => s.name == "tName");

  let isknockOut = switchKnockOut ? (switchKnockOut.value == "on" ? true : false) : false;

  config.playerNumber = playerNos ? playerNos.value : config.playerNumber;
  config.tournamentName = tourName ? (tourName.value.trim() == "" ? config.tournamentName : tourName.value.trim()) : config.tournamentName;
  config.stages.find(s => s.key == "RR").knockOut = isknockOut;

  $('#successAlertSettings').css("display", 'block');
  $('#settingsModalDialog').hide();
  setTimeout(() => {
    $('#successAlertSettings').css("display", 'none');
    $('#settingsModal').modal('hide');
    $("#tournamentName").html(config.tournamentName);
    $("#tourName1").html(config.tournamentName);
  }, 2000)

}

function saveTeam(e) {
  e.preventDefault();

  if (config.isTournamentStarted) {
    $("#createTeamError").html("Sorry ... tournament has begun, can't add any more teams").show();
    return false;
  }

  let serialisedForm = $("#team").serializeArray();
  let teamName = serialisedForm[0].value, b = [];
  serialisedForm.shift();
  let teamNameValid = !teamsX.some(t => t.team.toLowerCase() === teamName.toLowerCase());
  if (serialisedForm.length > 0 && teamNameValid) {
    $("#createTeamError").html("").hide();
    for (let i = 0; i < serialisedForm.length;) {
      b.push({
        history: [],
        id: (i % serialisedForm.length) / 2 + 1,
        name: serialisedForm[i].value,
        playerId: (i % serialisedForm.length) / 2 + 1,
        points: 0,
        sex: serialisedForm[i + 1].value,
        teamName: teamName
      })
      i += 2;
    };

    let team = {
      id: teamsX.length + 1,
      menDoubles: [],
      womenDoubles: [],
      mixDoubles: [],
      team: teamName,
      players: b
    };

    TeamMethods.createDoubles(team);
    TeamMethods.createMixDoubles(team);
    teamsX.push(team);

    $("#team")[0].reset();
    $("#teamName").html(teamName);
    $('#successAlert').css("display", 'block');
    $('#createTeamsModalDialog').hide();
    $("#playerAddSection").html("");
    $("#scheduleGeneateError").html("").hide();
    playerCount = 0;

    setTimeout(() => {
      $('#successAlert').css("display", 'none');
      $('#createTeamModal').modal('hide');
    }, 2000)
  } else {
    let message = serialisedForm.length == 0 ? "Add atleast one player in the team." : !teamNameValid ? "Team with the same name exisits." : "";
    $("#createTeamError").html(message).show();
  }

}

function createRandomTeams(e) {
  e.preventDefault();

  if (config.isTournamentStarted) {
    $("#randomTeamError").html("Cannot generate teams after tournament has begun.").show();
    return false;
  }

  let noOfTeams = $("#numTeam").val() || 0;
  $("#randomTeamError").html("").hide();
  let requiredPlayers = 0, teamInfo = [];
  $("#createTeamsBtn").html(`<i class="fas fa-spinner fa-spin"></i>`);
  $("#createTeamsBtn").attr("disabled", true);
  $("#cancelCreateRandomTeams").hide();

  if (noOfTeams == 0) {
    $("#randomTeamError").html("Some error occurred. Try again to create the teams.").show()
    return false;
  }

  for (let i = 0; i < noOfTeams; i++) {
    let r = Math.floor(Math.random() * 3) + 3;
    // Math.floor(Math.random() * (max - min + 1)) + min;

    requiredPlayers += r;
    teamInfo.push({
      id: i + 1,
      menDoubles: [],
      womenDoubles: [],
      mixDoubles: [],
      players: [],
      team: `Team ${i + 1}`,
      reqPlayers: r
    })
  }

  $.ajax({
    url: 'https://randomuser.me/api/?inc=gender,name&results=' + requiredPlayers + '&noinfo&nat=gb',
    dataType: 'json',
    success: function (data) {
      setTimeout(() => {
        $("#createTeamsBtn").html(`Create Teams`);
        $("#createTeamsBtn").attr("disabled", false);
        teamInfo.forEach(team => {
          for (let i = 0; i < team.reqPlayers; i++) {
            let dp = data.results.shift();
            let p = { id: i, name: `${dp.name.first} ${dp.name.last}`, sex: dp.gender == 'male' ? 'M' : 'F', history: [], points: 0, teamName: team.team};
            team.players.push(p);
          }
          TeamMethods.createDoubles(team);
          TeamMethods.createMixDoubles(team);
        });

        teamsX = teamInfo;
        localStorage.setItem('teams', JSON.stringify(teamsX));
        $("#teamNos").html(noOfTeams);
        $('#successrandomTeam').css("display", 'block');
        $('#rTeamModalDialog').hide();
        setTimeout(() => {
          $('#successrandomTeam').css("display", 'none');
          $('#randomTeamModal').modal('hide');
          $("#tournamentName").html(config.tournamentName);
          $("#scheduleGeneateError").html("").hide();
        }, 2000)
      }, 1000);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (localStorage.getItem('teams')) {
        teamsX = JSON.parse(localStorage.getItem('teams'));
      } else {
        $("#cancelCreateRandomTeams").show();
        $("#createTeamsBtn").html(`Create Teams`);
        $("#randomTeamError").html("Some error occurred. Try again to create the teams.")
      }
    }
  });
}

function showEditableTeamRow(team, player) {
  if (config.isTournamentStarted) {
    $(`#teamEditError_${team + 1}`).html('Tournament has begun. No more editing allowed').show()
    return false;
  } else {
    $(`#displayPlayer_${team + 1}_${player + 1}`).hide(50);
    $(`#editablePlayer_${team + 1}_${player + 1}`).show(2000);
  }
}

function submitEditedTeamRow(team, player) {
  $(`#editablePlayer_${team + 1}_${player + 1}`).hide(50);
  $(`#displayPlayer_${team + 1}_${player + 1}`).show(2000);
  let newName = $(`#player_${team + 1}_${player + 1}_Name`).val() || teamsX[team].players[player].name;
  let genderValue = $(`input[name='edit_p_${team + 1}_${player + 1}']:checked`).val();
  let newSex = genderValue == 'M' ? 'Male' : 'Female'
  teamsX[team].players[player].name = newName;
  teamsX[team].players[player].sex = newSex;
  $(`#displayPlayer_name_${team + 1}_${player + 1}`).html(newName);
  $(`#displayPlayer_sex_${team + 1}_${player + 1}`).html(newSex);
}

function viewTeams() {
  $("#teamAccordion").html("");

  if (teamsX.length == 0) {
    $("#viewTeamError").html("No teams yet... Create teams using other options").show();
    return false;
  }

  let teamAcc = "";
  teamsX.forEach((team, i) => {
    let show = i == 0 ? "show" : "";
    let players = `<table class="table table-borderless table-fixed">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Gender</th>
        <th scope="col">Points</th>
        <th scope="col">Edit</th>
      </tr>
    </thead><tbody>`;
    team.players.forEach((p, j) => {
      players += `<tr id="displayPlayer_${i + 1}_${j + 1}">
        <td>${j + 1}</td>
        <td id="displayPlayer_name_${i + 1}_${j + 1}">${p.name.split(" ").map(s => s[0].toUpperCase() + s.substr(1)).join(" ")}</td>
        <td id="displayPlayer_sex_${i + 1}_${j + 1}">${p.sex == 'M' ? 'Male' : 'Female'}</td>
        <td>${p.points}</td>
        <td><i class="far fa-edit editSubmitIcon" onClick="showEditableTeamRow(${i}, ${j})"></i></td>
      </tr><tr style="display: none;" id="editablePlayer_${i + 1}_${j + 1}">
        <td>${j + 1}</td>
        <td><input pattern="${config.nameRegex}" title="Only alphabets of length from 3 -10" type="text" class="form-control" name="edit_player_${i + 1}_${j + 1}" required id="player_${i + 1}_${j + 1}_Name" value="${p.name}"></td>
        <td><div class="form-check form-check-inline">
        <input required ${p.sex == 'M' ? "checked" : ""} class="form-check-input" type="radio" name="edit_p_${i + 1}_${j + 1}" id="r_${i + 1}_${j + 1}_m" value="M">
        <label class="form-check-label" for="r_${i + 1}_${j + 1}_m">Male</label>
      </div>
      <div class="form-check form-check-inline">
        <input ${p.sex == 'F' ? "checked" : ""} class="form-check-input" type="radio" name="edit_p_${i + 1}_${j + 1}" id="r_${i + 1}_${j + 1}_f" value="F">
        <label class="form-check-label" for="r_${i + 1}_${j + 1}_f">Female</label>
      </div></td>
        <td>${p.points}</td>
        <td><i class="fas fa-arrow-right editSubmitIcon" onClick="submitEditedTeamRow(${i}, ${j})"></i></td>
      </tr>`

    });

    players += `</tbody></table>`;



    teamAcc += `<div class="card">
    <div class="card-header" id="heading${i + 1}">
      <h5 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i + 1}" aria-expanded="true" aria-controls="collapse${i + 1}">
          ${team.team}
        </button>
      </h5>
    </div>
  
    <div id="collapse${i + 1}" class="collapse ${show}" aria-labelledby="heading${i + 1}" data-parent="#teamAccordion">
      <div class="card-body">
        <div class="clearfix">
          <div class="float-left text-danger error" id="teamEditError_${i + 1}"></div>
        </div>
        ${players}
      </div>
    </div>
  </div>`
  });

  $("#teamAccordion").append(teamAcc);
}

