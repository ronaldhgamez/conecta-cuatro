
const CHECKER = {
  RED: "red",
  YELLOW: "yellow"
}
/* import {CPU_IA} from './IA' */

var game = {
  board: [
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0
  ],
  shape: 7
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function transition(indexes, color) {

  let element = indexes.shift();

  while (indexes.length > 0) {
    document.getElementById(element).setAttribute("color", color)
    await sleep(30); // Esperar 2 segundos
    document.getElementById(element).setAttribute("color", "none")
    element = indexes.shift();
  }
  document.getElementById(element).setAttribute("color", color)

  matrix[element] = (color == "yellow") ? 1 : 2;
  
}

const getBottom = function (index) {

  let n = game["shape"];
  var indexes = [];

  // Lets fine the first index element of the row
  var indexSuperior = index;
  while (indexSuperior > n) {
    indexSuperior -= n;
  }

  // Lets add the rest of the index
  while (indexSuperior < index  /* && document.getElementById(index).getAttribute("color") == "none" */) {
    indexes.push(indexSuperior)
    indexSuperior += n;
  }

  // Finally adds indexes from current index
  while ((index + n) < (n * n) && document.getElementById(index + n).getAttribute("color") == "none") {
    indexes.push(index)
    index += n;
  }
  indexes.push(index)
  console.log(indexes)
  return indexes
};

/**
 * Returns the length of a string.
 * @param {number} color - 1 for yellow, 2 for read.
 * @param {number} index - The id of
 */
function startGame() {

  var table = document.getElementById("board");
  var tdList = Array.from(table.getElementsByTagName("td"));

  tdList.map((elem, index) => {
    // Set ids to the td elements
    elem.setAttribute("id", index)
    elem.setAttribute("color", "none")
    /* elem.textContent = index; */
    // Add the function to the td elements when click
    elem.onclick = function () {
      var indexes = getBottom(index);
      transition(indexes, "yellow");

      index = CPU_IA(2, 1);
      var indexes = getBottom(index);
      transition(indexes, "red");
    }
  })

}