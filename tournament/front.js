const teamsX = [];
let playerCount = 0;
$(document).ready(()=>{
  $('#createTeamModal').on('hidden.bs.modal', function (e) {
    $("#team")[0].reset();
    $("#playerAddSection").html("");
    playerCount=0;
  })
  
  $('#settingsModal').on('hidden.bs.modal', function (e) {
    $("#settings")[0].reset();
  })

  $('#settingsModal').on('show.bs.modal', function (e) {
    $("#tName").attr("placeholder", config.tournamentName)
    $("#trrKnockOut").attr("checked", config.knockout)
    $("#pNum").val(config.playerNumber);
    $('#settingsModalDialog').show();
  })

  $("#tournamentName").html(config.tournamentName);
})
function addPlayerRow() {
  if (playerCount < 5) {
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
    $(".error").html("").hide();
    playerCount++;
  } else {
    $(".error").html("Team size limit reached").show();
  }
}

function saveSettings(e) {
  e.preventDefault();
  let serialisedForm = $("#settings").serializeArray();
    
  let switchKnockOut = serialisedForm.find(s => s.name == "trrKnockOut");
  let playerNos = serialisedForm.find(s => s.name == "pNum");
  let tourName = serialisedForm.find(s => s.name == "tName");
  
  config.knockout = switchKnockOut ? (switchKnockOut.value == "on" ? true : false) : false;
  config.playerNumber = playerNos ? playerNos.value : config.playerNumber;
  config.tournamentName = tourName ? (tourName.value.trim() == "" ? config.tournamentName : tourName.value.trim()) : config.tournamentName;

  $('#successAlertSettings').css("display",'block');
  $('#settingsModalDialog').hide();
  alert(config.tournamentName);
  setTimeout(()=>{
    $('#successAlertSettings').css("display",'none');
    $('#settingsModal').modal('hide');
    $("#tournamentName").html(config.tournamentName);
  },1000)
}

function saveTeam(e) {
  e.preventDefault();
  let serialisedForm = $("#team").serializeArray();
  let teamName = serialisedForm[0].value, b = [];
  serialisedForm.shift();
  let teamNameValid = !teamsX.some(t=>t.name.toLowerCase()===teamName.toLowerCase());
  if(serialisedForm.length>0 && teamNameValid) {
    $(".error").html("").hide();
    for (let i = 0; i < serialisedForm.length;) {
      b.push({
        id: (i % serialisedForm.length) / 2,
        name: serialisedForm[i].value,
        sex: serialisedForm[i + 1].value,
        history: [],
        points: 0
      })
      i += 2;
    };
  
    teamsX.push({
      id: teamsX.length + 1,
      menDoubles: [], 
      womenDoubles: [], 
      mixDoubles: [], 
      name: teamName,
      players: b
    });
    $("#team")[0].reset();
    $("#teamName").html(teamName);
    $('#successAlert').css("display",'block');
    $("#playerAddSection").html("");
    playerCount=0;
  } else {
    let message= serialisedForm.length==0 ? "Add atleast one player in the team." : !teamNameValid ? "Team with the same name exisits." :"";
    $(".error").html(message).show();
  }
  
}