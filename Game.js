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
    this.moves = 0;
  }

  // Generates a random number between 1 and 2
  setInitialPlayer() {
    // Genera un número aleatorio entre 1 y 2
    const numeroAleatorio = Math.random() + 1;
    this.currentPlayer = (numeroAleatorio == 1) ? DISKS.YELLOW : DISKS.RED;
  }

  insertDisk(index) {
    /* Avoid double clicks */
    if (!isPlayerTurn()) {
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
    if (this.state == 3) {
      alert("terminado");
      //return;
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
      game.moves++;
      document.getElementById('moves').innerHTML = 'Moves: ' + game.moves;

      // Vakes computer move
      await sleep(1500);
      var isOver = cpu()
      
      if(isOver) {
        this.state = states.OVER
      }
    }
  }

  gameOver() {
    // Aquí iría la lógica para determinar si el juego ha terminado
    // (por ejemplo, si un jugador ha ganado o si ya no quedan más movimientos posibles)
    return (this.state == states.OVER) ? true : false
  }
}