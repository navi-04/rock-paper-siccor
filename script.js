let computerMove = "";
let result = "";
let isAutoPlay = true;

let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  losses: 0,
  tie: 0,
};

function reset_score() {
  score.win = 0;
  score.losses = 0;
  score.tie = 0;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
}

function pickAutoPlayMove() {
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    move = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    move = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    move = "Scissors";
  }
  return move;
}
function updateScoreElement(move) {
  if (move !== "reset") {
    document.querySelector(".js-result").innerHTML = result;
    document.querySelector(
      ".js-moves"
    ).innerHTML = `You <img class="result-emoj picture-image" src="${move}-emoji.png"> <img class="result-emoj picture-image"  src="${computerMove}-emoji.png"> computer`;
    document.querySelector(
      ".js-score"
    ).innerHTML = `win: ${score.win}, losess: ${score.losses},  tie: ${score.tie}`;
  } else {
    document.querySelector(".js-result").innerHTML = "";

    document.querySelector(".js-moves").innerHTML = "";

    document.querySelector(".js-score").innerHTML = "";
  }
}
function resultGain(playerMove) {
  if (playerMove == "Rock") {
    pickComputerMove();
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You Lose";
    } else if (computerMove === "Scissors") {
      result = "You Win";
    }
    if (result === "You Win") {
      score.win += 1;
    } else if (result === "You Lose") {
      score.losses += 1;
    } else {
      score.tie += 1;
    }
    localStorage.setItem("score", JSON.stringify(score));
  } else if (playerMove == "Paper") {
    pickComputerMove();
    if (computerMove === "Rock") {
      result = "You Win";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Scissors") {
      result = "You Lose";
    }
    if (result === "You Win") {
      score.win += 1;
    } else if (result === "You Lose") {
      score.losses += 1;
    } else {
      score.tie += 1;
    }
    localStorage.setItem("score", JSON.stringify(score));
  } else if (playerMove == "Scissors") {
    pickComputerMove();
    if (computerMove === "Rock") {
      result = "You Lose";
    } else if (computerMove === "Paper") {
      result = "You Win";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
    if (result === "You Win") {
      score.win += 1;
    } else if (result === "You Lose") {
      score.losses += 1;
    } else {
      score.tie += 1;
    }
    localStorage.setItem("score", JSON.stringify(score));
  }
}
let intervalid;
function autoplay() {
  document.querySelector(".stop-button").innerHTML = `<button class="stopAutoplay-button" onclick="
  isAutoPlay = false;
  autoplay();
  ">
    stop
  </button>`;
  if (isAutoPlay) {
intervalid = setInterval(function () {
      const autoPlayerMove = pickAutoPlayMove();
      resultGain(autoPlayerMove);
      updateScoreElement(autoPlayerMove);
    }, 1000);
  }else{
    clearInterval(intervalid);
    isAutoPlay = true;
    document.querySelector(".stop-button").innerHTML = "";
  }
}
