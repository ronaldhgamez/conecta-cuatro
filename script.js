/////////////////////////////////////////////////////////////////////
// DOM FUNCTIONS
/////////////////////////////////////////////////////////////////////

var game = new Game()


// When page loads verify if user has a nickname
window.onload = function () {
  const authuser = localStorage.getItem("authuser");
 /*  if (!authuser) {
    var modal = document.getElementById("nicknameModal");
    modal.style.display = "grid"; // Display nickname modal
  } */
  // Disable start button if no user entered
  document.getElementById('startButton').disabled = (authuser) ? false : true;
  document.getElementById('startButton').disabled = false;
}


function submitNickname() {
  var nickname = document.getElementById("nickname-input").value.trim();
  if (nickname && nickname.length > 1) {
    localStorage.setItem("authuser", nickname);
    document.getElementById('startButton').disabled = false;
  }
}


var circle = document.querySelector('.circle');
document.addEventListener('mousemove', (e) => {
  circle.style.left = (e.pageX - 25) + 'px';
  circle.style.top = (e.pageY - 25) + 'px';
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function transition(indexes, color) {

  var element = null;

  while (indexes.length > 0) {
    // Get and delete the first element
    element = indexes.shift();
    // Set color
    document.getElementById(element).setAttribute("color", color)
    await sleep(30);
    document.getElementById(element).setAttribute("color", "none")
  }

  // When indexes is not empty
  if (indexes.length == 0 && element != null) {
    document.getElementById(element).setAttribute("color", color)
    matrix[element] = (color == "yellow") ? 1 : 2;
    return true;
  }
  return false;
}

function render() {

  matrix.map((elem, index) => {
    document.getElementById(index + "").setAttribute("color", elem)
  })

}

const getBottom = function (index) {

  let n = game.shape;
  var indexes = [];

  // Lets fine the first index element of the row
  var indexSuperior = index;
  while (indexSuperior >= n) {
    indexSuperior -= n;
  }

  var stop = n * n;
  // Lets add the rest of the index
  while (indexSuperior < stop && document.getElementById(indexSuperior).getAttribute("color") == "none") {
    indexes.push(indexSuperior)
    indexSuperior += n;
  }

  return indexes
}


/**
 * Returns the length of a string.
 * @param {number} color - 1 for yellow, 2 for read.
 * @param {number} index - The id of
 */
function prepareGame() {

  var table = document.getElementById("board");
  var tdList = Array.from(table.getElementsByTagName("td"));
  document.getElementById("startButton").setAttribute("style", "display: none;");
  document.getElementById("gameOptions").setAttribute("style", "display: flex;");

  tdList.map((elem, index) => {
    // Set ids to the td elements
    elem.setAttribute("id", index)
    elem.setAttribute("color", "none")

    // Add the function to the td elements when click
    elem.onclick = async function () {
      if (game.isPlayerTurn()) {
        // Block click
        game.changeTurn();
        var indexes = getBottom(index);
        var changed = await transition(indexes, game.playerColor);
        // Validate if move were made
        (!changed) ? game.changeTurn() : 0;
      } else {
        alert("Wait your turn")
      }
    }

    // Set color of user disk
    circle.style.backgroundColor = game.playerColor;
    circle.style.opacity = 1;
  })

  stopwatchWorker.postMessage('start');
}

async function cpu() {
  if (isOver == false) {
    var index = CPU_IA(2, 1);
    var indexes = getBottom(index);
    var changed = await transition(indexes, game.cpuColor);
    matrix[index] = 2;
    (changed) ? game.changeTurn() : alert("Wait your turn");
  }
  return isOver
}



const stopwatchWorker = new Worker('stopwatch.js');
let elapsedTime = 0;

stopwatchWorker.onmessage = function (event) {
  elapsedTime = event.data;
  // Update the display of the elapsed time
  document.getElementById('stopwatch').innerHTML = "Time: " + elapsedTime;
};


function pauseGame() {
  stopwatchWorker.postMessage('pause');
  document.getElementById('pauseButton').setAttribute("style", "display: none;");
  document.getElementById('resumeButton').removeAttribute('style');
}

function resumeGame() {
  stopwatchWorker.postMessage('pause');
  document.getElementById('resumeButton').setAttribute("style", "display: none;");
  document.getElementById('pauseButton').removeAttribute('style');
}

function restartGame() {
  stopwatchWorker.postMessage('stop');
  document.getElementById('pauseButton').setAttribute("style", "display: none;");
  document.getElementById('resumeButton').removeAttribute('style');
  restartMatrix();
  game = new Game();
  render();
}