const states = {
  INITIAL: 0,
  INGAME: 1,
  PAUSED: 2,
  OVER: 3
}

const DISKS = {
  RED: "red",
  YELLOW: "yellow"
}


class Game {

  constructor() {
    this.currentPlayer = DISKS.YELLOW;
    this.playerColor = DISKS.YELLOW;
    this.cpuColor = DISKS.RED;
    this.state = states.INITIAL;
    this.shape = 7;
  }

  // Generates a random number between 1 and 2
  setInitialPlayer() {
    // Genera un número aleatorio entre 1 y 2
    //const numeroAleatorio = Math.random() + 1;
    this.currentPlayer = DISKS.YELLOW;
  }

  insertDisk(index) {
    if (!isPlayerTurn()) {
      alert("No es tu turno para actuar");
      return false;
    }

    // Aquí iría la lógica para realizar la acción del jugador
    matrix[index] = (this.currentPlayer == this.playerColor) ? 1 : 2;

    // Luego de que el jugador actúa, se cambia el turno al siguiente jugador
    this.changeTurn();
  }

  isPlayerTurn() {
    return (this.currentPlayer === this.playerColor) ? true : false;
  }

  async changeTurn() {
    // Verificamos si el juego ha terminado
    if (this.gameOver()) {
      alert("terminado");
      return;
    }

    // Change to user's turn
    if (this.currentPlayer === this.cpuColor) {
      circle.style.opacity = 1;
      this.currentPlayer = this.playerColor;
    }
    // Computer's turn
    else {
      circle.style.opacity = 0;
      this.currentPlayer = this.cpuColor;

      // Vakes computer move
      await sleep(1500);
      cpu();
    }
  }

  gameOver() {
    // Aquí iría la lógica para determinar si el juego ha terminado
    // (por ejemplo, si un jugador ha ganado o si ya no quedan más movimientos posibles)
    return (this.state == states.OVER) ? true : false
  }
}




var game = new Game()
var circle = document.querySelector('.circle');


/////////////////////////////////////////////////////////////////////
// DOM FUNCTIONS
/////////////////////////////////////////////////////////////////////

document.addEventListener('mousemove', (e) => {
  var x = e.pageX - 25;
  var y = e.pageY - 25;
  circle.style.left = x + 'px';
  circle.style.top = y + 'px';
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
}

async function cpu() {
  var index = CPU_IA(2, 1);
  var indexes = getBottom(index);
  var changed = await transition(indexes, game.cpuColor);
  matrix[index] = 2;
  (changed) ? game.changeTurn() : alert("Wait your turn");
}