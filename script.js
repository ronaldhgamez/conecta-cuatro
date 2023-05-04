var board = [
  [1, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 1]
]

document.addEventListener("click", function (event) {
  // Obtenemos los elementos del DOM
  var table = document.getElementById("board");

  // Obtenemos las coordenadas X e Y del cursor
  var x = event.clientX;
  var y = event.clientY;

  /* console.log(x)
  console.log(y) */

  // Actualizamos la posición del cursor
  //cursor.style.left = x + "px";
  //cursor.style.top = y + "px";
});


function handleClick(id) {
  /* var td = event.target;
  if (td.tagName === "TD") {
    
  } */
  console.log(id);
}

/**
 * Returns the length of a string.
 * @param {number} color - 1 for yellow, 2 for read.
 * @param {number} index - The id of
 */
function putCheckerOnBoard(color, index) {

}


function startGame() {

  var table = document.getElementById("board");
  var tdList = Array.from(table.getElementsByTagName("td"));

  
  tdList.map((elem, index) => {
    // Set ids to the td elements
    elem.setAttribute("id", index)
    // Add the function to the td elements when click
    elem.onclick = function() {
      console.log("The td element was clicked!" + index);
    };
  })

  /* board.map((elem, index) => {
    console.log(elem)
  }) */
}