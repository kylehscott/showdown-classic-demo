var currentBatter = 0

var playerImage = function(mlbId) {
  return "http://mlb.mlb.com/mlb/images/players/head_shot/" + String(mlbId) + ".jpg";
};

var basePosition = [null,null,null]

var outs = 0;

var awayTeamRuns = 0;
var homeTeamRuns = 0;

var awayTeam = {
  runs: 0,
  batter: 0,
  batterInfo: awayTeamData.lineup
}

var homeTeam = {
  runs: 0,
  batter: 0,
}

var currentTeam = awayTeam;
var currentTeamRuns = awayTeam.runs;
var currentBatter = currentTeam.batter;

var batter = currentTeam.batterInfo[currentBatter];

var pitcher = {
  mlbId: 121811,
  name: "Curt Schilling",
  control: 3,
  speed: "A",
  pos: "Starter",
  hand: "R",
  popUp: "1-3",
  strikeOut: "4-8",
  groundBall: "9-13",
  flyBall: "14-17",
  walk: "-",
  single: "18-19",
  singlePlus: "-",
  double: "20-",
  triple: "-",
  homeRun: "-"
};

var checkResult = function (player, roll) {
  if (roll == player.popUp.split('-')[0] || roll <= player.popUp.split('-')[1]) {
    outs += 1;
    return "Pop up";
  } else if (roll == player.strikeOut.split('-')[0] || roll <= player.strikeOut.split('-')[1]) {
    outs += 1;
    return "Strike Out";
  } else if (roll == player.groundBall.split('-')[0] || roll <= player.groundBall.split('-')[1]) {
    outs += 1;
    return "Ground ball";
  } else if (roll == player.flyBall.split('-')[0] || roll <= player.flyBall.split('-')[1]) {
    outs += 1;
    return "Fly ball";
  } else if (roll == player.walk.split('-')[0] || roll <= player.walk.split('-')[1]) {
    basePosition.unshift(batter);
    return "Walk";
  } else if (roll == player.single.split('-')[0] || roll <= player.single.split('-')[1]) {
    basePosition.unshift(batter);
    return "Single";
  } else if (roll == player.singlePlus.split('-')[0] || roll <= player.singlePlus.split('-')[1]) {
    basePosition.unshift(batter);
    return "Single Plus";
  } else if (roll == player.double.split('-')[0] || roll <= player.double.split('-')[1]) {
    basePosition.unshift(null,batter);
    return "Double";
  } else if (roll == player.triple.split('-')[0] || roll <= player.triple.split('-')[1]) {
    basePosition.unshift(null,null,batter);
    return "Triple";
  } else if (roll == player.homeRun.split('-')[0] || roll <= player.homeRun.split('-')[1]) {
    basePosition.unshift(null,null,null);
    currentTeam.runs += 1;
    return "Home Run";
  }
}

var roll = function () {
  return Math.floor(Math.random() * Math.floor(20)) + 1;
};

$("#roll-button").click(function () {
  var rollResult = roll()
  $("#roll-result").text("Roll result: " + rollResult);
  if (pitcher.control + rollResult >= batter.onBase) {
    advantage = pitcher;
  } else {
    advantage = batter;
  }
  $("#test-box").append("<p>" + advantage.name + " won</p>").animate({scrollTop: $("#test-box").prop("scrollHeight")}, 500);
  playResult = checkResult(advantage, roll());
  $("#test-box").append("<p>Result: " + playResult + "</p>").animate({scrollTop: $("#test-box").prop("scrollHeight")}, 500);
    bases = ["#first-base", "#second-base", "#third-base"]
    for (i = 0; i < 3; i++) {
      if (basePosition[i] != null){

        $(bases[i]).attr("src", playerImage(basePosition[i].mlbId));
      } else {
        $(bases[i]).attr("src", playerImage(545361));
      }
    };

    if (basePosition.length > 3) {
      for (i = 3; i < basePosition.length; i++){
        if (basePosition[i] != null) {
          currentTeam.runs += 1;
        }
      $("#away-runs").text(currentTeam.runs);
      basePosition.length = 3;
      };
    }
    console.log(outs);
    $("#outs").text("Outs: " + String(outs));

  $("#away-batter-" + String(currentTeam.batter + 1)).removeClass("table-dark");
  if (currentTeam.batter < 8) {
    currentTeam.batter += 1;
  } else {
    currentTeam.batter = 0;
  }
  $("#away-batter-" + String(currentTeam.batter + 1)).addClass("table-dark");
  batter = awayTeamData.lineup[currentTeam.batter];
  $("#batters-box").attr("src", playerImage(batter.mlbId));
  $("#test-box").append("Now batting: " + batter.name);

});

var init = function() {
  $("#test-box").append("<p>Now batting: " + batter.name + "</p>");
  $("#batters-box").attr("src", playerImage(batter.mlbId));
  $("#away-batter-" + String(currentTeam.batter + 1)).addClass("table-dark");
  $('.popover-dismiss').popover({
    trigger: 'focus'
  })
};

init();
