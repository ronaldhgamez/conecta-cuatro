/*
var n = 8;
var matrix = [
    0, 0, 0, 0, 0, 0, 0, 0, // 0
    0, 0, 0, 0, 0, 0, 0, 0, // 8
    0, 0, 0, 0, 0, 0, 0, 0, // 16
    0, 0, 0, 0, 0, 0, 0, 0, // 24
    0, 0, 0, 0, 0, 0, 0, 0, // 32
    0, 0, 0, 0, 0, 0, 0, 0, // 40
    0, 0, 0, 0, 0, 0, 0, 0, // 48
    0, 0, 0, 0, 0, 0, 0, 0  // 56
];
*/
/*
var n = 8;
var matrix = [
    0, 0, 0, 0, 0, 0, 0, 0, // 0
    0, 0, 0, 0, 0, 0, 0, 0, // 8
    0, 0, 0, 0, 0, 0, 0, 0, // 16
    0, 0, 0, 0, 0, 0, 0, 0, // 24
    0, 0, 0, 0, 0, 0, 0, 0, // 32
    0, 0, 2, 0, 2, 0, 0, 0, // 40
    0, 0, 1, 2, 1, 2, 0, 0, // 48
    0, 1, 1, 2, 1, 2, 0, 0 // 56
];
*/
/* crear doble jugada
var n = 8;
var matrix = [
    0, 0, 0, 0, 0, 0, 0, 0, // 0
    0, 0, 0, 0, 0, 0, 0, 0, // 8
    0, 0, 0, 0, 0, 0, 0, 0, // 16
    0, 0, 0, 0, 0, 0, 0, 0, // 24
    0, 0, 0, 0, 0, 0, 0, 0, // 32
    0, 0, 2, 0, 2, 0, 0, 0, // 40
    0, 0, 1, 2, 1, 2, 1, 0, // 48
    1, 1, 2, 2, 1, 2, 2, 1  // 56
];
*/

// estado corregir que gana con el movimiento contrario

/* var n = 7;
var matrix = [
    0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 2, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 
    0, 0, 0, 1, 1, 2, 0, 
    0, 2, 2, 2, 1, 2, 2, 
    2, 1, 1, 1, 2, 2, 1]; */



var n = 7;
var isOver = false;

var matrix = [
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0
];

//var matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 2, 1, 0, 1, 2, 2, 2, 1, 1, 1];

// no valida gane en diagonal
//var matrix = [0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 1, 1, 1, 0, 0, 2, 1, 1, 1, 2, 0, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 2, 2, 1];


// Validates if it is the player's first move
function isInitialMove(color) {
    var size = n * n;
    for (var i = (size - 1); i >= 0; i--) {
        // There is one checker already
        if (matrix[i] == color)
            return false;
    }
    return true;
}

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
    var random;
    do {
        random = Math.floor(Math.random() * (max - min)) + min;
    } while (matrix[random] != 0);
    return random;
}

// Adds a new element to the received object. If the item already exists, add 1 to its key.
function addElementToObject(object, e) {
    (object.hasOwnProperty(e)) ? (object[e] += 1) : object[e] = 1;
    return object;
}

// Combine 2 json objects, if they have elements with the same key it adds to the value
function combineObjects(obj1, obj2) {
    for (var key in obj2) {
        var times = obj2[key];
        for (var i = 0; i < times; i++) {
            obj1 = addElementToObject(obj1, key);
        }
    }
    return obj1;
}

// Validate if the index is a empty space and if has a checker below
function isEmptyAndValid(tempIndex) {
    return (matrix[tempIndex] == 0 && matrix[tempIndex + n] != 0) ? true : false;
}

// Returns an array with all possible indices where a checker can be inserted
function allPosiblesIndex() {
    var indexes = [];
    for (var i = (matrix.length - 1); i >= (matrix.length - n); i--) {
        let j = i;
        while (j >= 0) {
            if (matrix[j] == 0) {
                indexes.push(j); // add posible index
                break;
            }
            j -= n;
        }
    }
    return indexes;
}

///////////////////////////////////////////////////////////////////////////////////////
// Functions to know where the computer has winning moves -->
///////////////////////////////////////////////////////////////////////////////////////

/* 
 * Returns a JSON with all the indices where the player can win.
 * If the opposing opponent has no move returns {}
 * Keys represents the index and values are the total times that can win.
 */
function searchWinningsIndices(color) {

    // Object of indeces where the computer can win
    var winIndices = {};

    // VERTICAL MOVES
    winIndices = verticalWinningIndeces(color);

    // HORIZONTAL MOVES
    var arrayIndexWin = horizontalWinningsIndices(color);
    if (Object.keys(arrayIndexWin).length > 0)
        winIndices = combineObjects(winIndices, arrayIndexWin); // Merge Objects

    // DIAGONAL MOVES
    arrayIndexWin = diagonalWinningsIndices(color);
    if (Object.keys(arrayIndexWin).length > 0)
        winIndices = combineObjects(winIndices, arrayIndexWin); // Merge Objects

    return winIndices;
}

// Returns a JSON with the indices where the player can win vertically
function verticalWinningIndeces(color) {
    var winIndices = {};
    var size = n * n;
    for (var i = (size - 1); i >= (size - n); i--) {
        let j = i;
        let count = 0;
        // It goes up in the matrix as long as there is no empty one
        while ((j - n) >= 0 && matrix[j] != 0) {
            if (matrix[j] == color)
                count += 1;
            else
                count = 0;
            j -= n; // Goes up

            if (count >= 3 && matrix[j] == 0)
                winIndices = addElementToObject(winIndices, j); // Adds the index to win moves
        }
    }
    return winIndices;
}

// Returns a JSON with the indices where the player can win horizontally
function horizontalWinningsIndices(color) {
    var winIndices = {};
    var size = n * n;

    for (var i = (size - 1); i >= (n - 1); i -= n) {
        var indices = createRows(i); // array of indices horizontal
        //console.log("GROUP: [" + indices + "]");
        // Merge Objects: add the posibles moves to winIndices
        winIndices = combineObjects(winIndices, evaluateRowOrDiagonal(indices, color));
    }
    return winIndices;
}

// Returns a JSON with the indices where the player can win diagonally
function diagonalWinningsIndices(color) {
    var winIndices = {};

    var i = n * n - 1;
    for (i; i >= (n * n - n); i--) {

        ///////////// Diagonal up right /////////////
        var indices = createRightDiagonal(i); // array of indices of diagonal

        // To ignore subgroups with less than 4 indices
        if (indices.length > 3) {
            // console.log("GROUP: [" + indices + "]");
            winIndices = combineObjects(winIndices, evaluateRowOrDiagonal(indices, color)); // Merge Objects
        }

        ///////////// Diagonal up left /////////////
        indices = createLeftDiagonal(i);

        // To ignore subgroups with less than 4 indices
        if (indices.length > 3) {
            //console.log("GROUP: [" + indices + "]");
            winIndices = combineObjects(winIndices, evaluateRowOrDiagonal(indices, color)); // Merge Objects
        }
    }

    return winIndices;
}

function createRows(tempIndex) {
    var i = tempIndex;
    var indices = []; // array of indices horizontal
    // For each row on the board create an array with all its indexes.
    while ((i - (n - 1)) >= 0 && tempIndex != (i - n)) {
        indices.push(tempIndex);
        tempIndex--;
    }
    return indices;
}

// Diagonal up right 
function createRightDiagonal(tempIndex) {
    var indexRow = Math.trunc(tempIndex / n);
    var indices = [];

    while (indexRow > 0 && tempIndex != (n * indexRow + (n - 1))) {
        indices.push(tempIndex);
        tempIndex = tempIndex - (n - 1);
        indexRow = Math.trunc(tempIndex / n);
    }
    indices.push(tempIndex);
    return indices;
}

// Diagonal up left 
function createLeftDiagonal(tempIndex) {
    var indexRow = Math.trunc(tempIndex / n);
    var indices = [];

    while (indexRow > 0 && tempIndex != n * indexRow) {
        indices.push(tempIndex);
        tempIndex = tempIndex - (n + 1);
        indexRow = Math.trunc(tempIndex / n);
    }
    indices.push(tempIndex);
    return indices;
}

/**
 * Receive an array with the indices of a row or a diagonal of the board.
 * Then, this creates subgroups of 4 indices and sends them to another function
 * to validate if the player has a chance of winning in the row or column received.
 */
function evaluateRowOrDiagonal(indices, color) {

    var start = 0;
    var count = 0;

    var winIndices = {};
    var group = []; // To store the subgroups.

    var len = indices.length;
    for (var i = 0; i <= len; i++) {
        if (count == 4) {
            //console.log("subgroup:: [" + group + "]");
            // valid if the is posibility to win
            var index = validateSubgroup(group, color);
            if (index > -1) {
                winIndices = addElementToObject(winIndices, index); // adds posible index win
            }
            i = start + 1;
            count = 0;
            start = i;
            group = [];
        }
        group.push(indices[i]);
        count++;
    }
    return winIndices;
}

/* Receives an array of 4 indices and validates if the computer can win
 * Returns the win index or -1 if there is no chance to win.
 */
function validateSubgroup(group, color) {
    var len = group.length;

    var playerColor = 0;
    var blank = 0;
    var indexWinner;

    for (var i = 0; i < len; i++) {
        if (matrix[group[i]] == color) {
            playerColor++;
            continue;
        }
        if (isEmptyAndValid(group[i])) {
            blank++;
            indexWinner = group[i];
        }
    }
    return (playerColor == 3 && blank == 1) ? indexWinner : -1;
}



///////////////////////////////////////////////////////////////////////////////////////
// Functions to try to create double plays -->
///////////////////////////////////////////////////////////////////////////////////////


/**
 * Returns the index where the computer can apply a double play.
 * Returns -1 if double play is not possible.
 */
function canMakeDoubleMove(p1Color, p2Color) {

    // Find all possible indices where a checker can be inserted
    var indices = allPosiblesIndex(); // [i, i, i, i]
    var size = indices.length;

    // For each possible movement its execution is simulated.
    for (var i = 0; i < size; i++) {

        // Simulating the move to searche posibles double moves
        var posiblesWin = simulateMove(indices[i], p1Color);

        // If the object has more than 1 the player1 can double play.
        let total = Object.keys(posiblesWin).length;
        if (total > 1) {
            console.log("Player: " + p1Color + " can make double move in " + indices[i]);
            console.log("Object returned: ");
            printObject(posiblesWin);

            if (!rivalCanWinByPlayerMove(indices[i], p1Color, p2Color))
                return indices[i]; // Returns the index to apply the double play
            else {
                console.log("Oh, be careful if u move there rival can win...");
                // Try to block one of the indices on the posibles win
                for (var key in posiblesWin) {
                    var index = parseInt(key);
                    if (isEmptyAndValid(index)) {
                        return index;
                    }
                }
            }
        }
    }
    return -1; // returns -1 if there is no way to apply a double move
}

// Run a double simulation to see if a double play can be built.
function canBuildDobleMove(p1Color, p2Color) {
    // Find all possible indices where a checker can be inserted
    var indices = allPosiblesIndex();
    var size = indices.length;

    // Posibles indices
    var posibles = [];

    // For each possible movement its execution is simulated.
    for (var i = 0; i < size; i++) {

        matrix[indices[i]] = p1Color; // Simulating

        // Ignores spaces where can build a line
        if (Object.keys(searchWinningsIndices(p1Color)).length > 0) {
            matrix[indices[i]] = 0;
            continue;
        }

        // Run double simulation
        var index = canMakeDoubleMove(p1Color, p2Color);
        // For not giving the opponent the chance to win
        var isValidMove = (Object.keys(searchWinningsIndices(p2Color)).length == 0) ? true : false;

        // Restart the matrix status
        matrix[indices[i]] = 0;

        if (index != -1) {
            console.log("A posible builded move can be done in: " + indices[i]);
            if (isValidMove) {
                console.log("Is a valid move");
                posibles.push(indices[i]);
            } else {
                console.log("Is a valid move");
            }
        }
    }
    let total = posibles.length;
    // TO RANDOMLY SELECT A THE MOVE
    return (total > 0) ? posibles[getRandomInt(0, total)] : -1; // returns -1 if there is no way to build a double move
}


///////////////////////////////////////////////////////////////////////////////////////
// Functions to find the horizontal and diagonal neighbors of a checker.  -->
///////////////////////////////////////////////////////////////////////////////////////

function horizontalNeighbors(index, color) {
    //////////////// Horizontal neighborings ////////////////
    var neigborsIndeces = [];

    let row = Math.trunc(index / n); // Represents the index row
    let tempIndex = index - 1;
    let tempRow = Math.trunc(tempIndex / n);

    // To the left
    let shift = 2;
    while (row == tempRow && shift > 0) {
        // If found a blocking checker
        if (matrix[tempIndex] != 0 && matrix[tempIndex] != color)
            break;
        if (isEmptyAndValid(tempIndex) || matrix[tempIndex] == color)
            neigborsIndeces.push(tempIndex);

        tempIndex--;
        tempRow = Math.trunc(tempIndex / n);
        shift--;
    }
    // To the right
    tempIndex = index + 1;
    tempRow = Math.trunc(tempIndex / n);

    shift = 2;
    while (row == tempRow && shift > 0) {
        // If found a blocking checker
        if (matrix[tempIndex] != 0 && matrix[tempIndex] != color)
            break;
        if (isEmptyAndValid(tempIndex) || matrix[tempIndex] == color)
            neigborsIndeces.push(tempIndex);

        tempIndex++;
        tempRow = Math.trunc(tempIndex / n);
        shift--;
    }

    return neigborsIndeces;
}

function diagonalNeighbors(index, color) {
    //////////////// Diagonal neighborings ////////////////
    var neigborsIndeces = [];

    // Diagona up/right: (index - (n - 1))  />
    let indexRow = Math.trunc(index / n);
    // Ignore column 0 and first row
    if (indexRow > 0 && index != (n * indexRow + (n - 1))) {

        tempIndex = index - (n - 1);
        let block = false;

        if (isEmptyAndValid(tempIndex) || matrix[tempIndex] == color) {
            neigborsIndeces.push(tempIndex);
        } else {
            if (matrix[tempIndex] != 0)
                block = true;
        }

        indexRowAnt = Math.trunc(tempIndex / n);
        tempIndex = tempIndex - (n - 1);
        indexRowSig = Math.trunc(tempIndex / n);

        if (!block && (indexRowAnt != indexRowSig) && (isEmptyAndValid(tempIndex) || matrix[tempIndex] == color)) {
            neigborsIndeces.push(tempIndex);
        }
    }

    // Diagonal up/left: (index - (n + 1)) <\
    indexRow = Math.trunc(index / n);
    // Ignores row 0 and column 0
    if (indexRow > 0 && index != n * indexRow) {
        tempIndex = index - (n + 1);
        let block = false;

        if (isEmptyAndValid(tempIndex) || matrix[tempIndex] == color) {
            neigborsIndeces.push(tempIndex);
        } else {
            if (matrix[tempIndex] != 0)
                block = true;
        }

        indexRowAnt = Math.trunc(tempIndex / n);
        tempIndex = tempIndex - (n + 1);
        indexRowSig = Math.trunc(tempIndex / n);

        if (!block && (indexRowAnt - 1 == indexRowSig) && (isEmptyAndValid(tempIndex) || matrix[tempIndex] == color)) {
            neigborsIndeces.push(tempIndex);
        }
    }

    // Diagonal down/left: (index + (n - 1)) </
    indexRow = Math.trunc(index / n);
    // Ignores last row (n - 1) and column 0
    if (indexRow < (n - 1) && index != n * indexRow) {

        tempIndex = index + (n - 1);
        let block = false;

        if (isEmptyAndValid(tempIndex) || matrix[tempIndex] == color) {
            neigborsIndeces.push(tempIndex);
        } else {
            if (matrix[tempIndex] != 0)
                block = true;
        }

        indexRowAnt = Math.trunc(tempIndex / n);
        tempIndex = tempIndex + (n - 1);
        indexRowSig = Math.trunc(tempIndex / n);

        if (!block && (indexRowAnt != indexRowSig) && (isEmptyAndValid(tempIndex) || matrix[tempIndex] == color)) {
            neigborsIndeces.push(tempIndex);
        }
    }

    // Diagonal down/right: (index + (n + 1))  \>
    indexRow = Math.trunc(index / n);
    // Ignores last column (n - 1) and last row (n - 1)
    if (indexRow < (n - 1) && index != (n * indexRow + (n - 1))) {

        tempIndex = index + (n + 1);
        let block = false;

        if (isEmptyAndValid(tempIndex) || matrix[tempIndex] == color) {
            neigborsIndeces.push(tempIndex);
        } else {
            if (matrix[tempIndex] != 0) // case is a block
                block = true;
        }
        indexRowAnt = Math.trunc(tempIndex / n);
        tempIndex = tempIndex + (n + 1);
        indexRowSig = Math.trunc(tempIndex / n);

        if (!block && (indexRowAnt == indexRowSig - 1) && (isEmptyAndValid(tempIndex) || matrix[tempIndex] == color)) {
            neigborsIndeces.push(tempIndex);
        }
    }
    return neigborsIndeces;
}

// Receives an index and returns its neighboring indices horizontally and diagonally.
function neighbors(index, color) {

    var neigbors = [];
    // Searches horizontal and diagonal indicesd
    neigbors = horizontalNeighbors(index, color);
    neigbors = neigbors.concat(diagonalNeighbors(index, color));

    return neigbors;
}


///////////////////////////////////////////////////////////////////////////////////////
// Validate if a player won the game -->
///////////////////////////////////////////////////////////////////////////////////////

function validateWin(color) {

    var indices = [];
    var size = n * n;

    // Horizontally
    for (var i = (size - 1); i >= (n - 1); i -= n) {
        indices = createRows(i); // array of indices horizontal

        var subgroup = evaluateSubgroups(indices, color);
        if (subgroup.length > 0) {
            return subgroup;
        }
    }

    var i = n * n - 1;
    for (i; i >= (n * n - n); i--) {
        ///////////// Diagonal up right /////////////
        indices = createRightDiagonal(i);

        var subgroup = evaluateSubgroups(indices, color);
        if (subgroup.length > 0) {
            console.log("El color " + color + " ganó en: [" + subgroup + "]");
            return subgroup;
        }

        ///////////// Diagonal up left /////////////
        indices = createLeftDiagonal(i);

        subgroup = evaluateSubgroups(indices, color);
        if (subgroup.length > 0) {
            return subgroup;
        }
    }

    // Vertically
    for (var i = (size - 1); i >= (size - n); i--) {
        let j = i;
        let count = 0;
        var subgroup = [];
        // It goes up in the matrix as long as there is no empty one
        while ((j - n) >= 0 && matrix[j] != 0) {
            if (matrix[j] == color) {
                count += 1;
                subgroup.push(j);
            } else {
                subgroup = [];
                count = 0;
            }
            j -= n; // Goes up

            if (count == 4)
                return subgroup;
        }
    }

    return [];
}

function evaluateSubgroups(indices, color) {
    var start = 0;
    var count = 0;

    var group = []; // To store the subgroups.

    var len = indices.length;
    for (var i = 0; i <= len; i++) {
        if (count == 4) {
            //console.log("subgroup:: [" + group + "]");
            // Validates if the player win
            if (winningGroup(group, color)) {
                return group;
            }
            i = start + 1;
            count = 0;
            start = i;
            group = [];
        }
        group.push(indices[i]);
        count++;
    }
    return [];
}

/** 
 * Receives an array of 4 indices and validates if the player win in that
 * subgroup
 */
function winningGroup(group, color) {
    var len = group.length;

    for (var i = 0; i < len; i++) {
        if (matrix[group[i]] != color)
            return false;
    }
    return true;
}


///////////////////////////////////////////////////////////////////////////////////////
// IA Logic Functions -->
///////////////////////////////////////////////////////////////////////////////////////

/**
 * Validates if a movement can give the victory to an enemy
 * p1Color: color of checker being simulated 
 * p2Color: color of checker to verify if can win
 */
function rivalCanWinByPlayerMove(index, p1Color, p2Color) {
    matrix[index] = p1Color; // Simulating player 1 move
    var posiblesWin = searchWinningsIndices(p2Color); // searches player 2 posibles wins
    matrix[index] = 0; // Return the state of the matrix

    let total = Object.keys(posiblesWin).length;
    return (total > 0) ? true : false;
}

/**
 * Validates if a movement can give the victory to the player
 * p1Color: color of checker being simulated
 */
function simulateMove(index, p1Color) {
    matrix[index] = p1Color; // Simulating move
    var posiblesWin = searchWinningsIndices(p1Color); // searches player posibles wins
    matrix[index] = 0; // Return the state of the matrix
    return posiblesWin;
}

function nextMove(p1Color, p2Color) {

    // Searches all posibles moves
    var indices = allPosiblesIndex();
    let size = indices.length;

    var posibles = [];
    let total = 0;

    for (var i = 0; i < size; i++) {

        // Ignores indices that can make opponent win
        if (rivalCanWinByPlayerMove(indices[i], p1Color, p2Color))
            continue;

        // Ignores indices that are a trick for opponent
        if (rivalCanWinByPlayerMove(indices[i], p1Color, p1Color))
            continue;

        // for every index search all  its neighbordings
        var array = neighbors(indices[i], p1Color);
        var arrayLength = array.length;

        if (arrayLength > total) {
            posibles = [];
            total = arrayLength;
            posibles.push(indices[i]); // Posible index to choose
        } else if (arrayLength == total) {
            posibles.push(indices[i]); // Posible index to choose
        }
    }
    //console.log("posibles: [" + posibles + "]");
    //console.log("they have total of neightbords: " + total);
    var len = posibles.length;
    return (total > 0) ? posibles[getRandomInt(0, len)] : -1;
}

function bestOptionToWin(winIndices) {
    // buscar el indice apropiado
    var index = -1;
    var total = 0; // veces que puede ganar con ese indice
    for (var key in winIndices) {
        if (winIndices[key] > total) {
            total = winIndices[key];
            index = parseInt(key);
        }
    }
    return index;
}

// Returns the next appropiate move
function CPU_IA(cpuColor, rivalColor) {

    if (isOver) {
        return -1
    }
    
    // 1. INITIAL MOVE
    if (isInitialMove(cpuColor) == true) {
        return nextMove(cpuColor, rivalColor); // Pseudo random index choice
    }
    console.clear()
    // 2. VERIFIES IF THE COMPUTER CAN WIN
    var winIndices = {};
    winIndices = searchWinningsIndices(cpuColor);
    if (Object.keys(winIndices).length > 0) {
        alert("Computer wins :)...");
        isOver = true;
        return bestOptionToWin(winIndices);
    }

    // 3. TO BLOCK OPPONENT MOVES
    winIndices = searchWinningsIndices(rivalColor);
    if (Object.keys(winIndices).length > 0) {
        console.log("Bloqueando gane enemigo...");
        return bestOptionToWin(winIndices);
    }

    // 4. VALIDATE IF THE COMPUTER CAN MAKE A DOUBLE MOVE
    console.log("4. VALIDATE IF THE COMPUTER CAN MAKE A DOUBLE MOVE");
    var index = canMakeDoubleMove(cpuColor, rivalColor);
    if (index != -1) {
        console.log("Computer: Realizando doble jugada");
        return index;
    } console.log("");

    // 5. VALIDATE IF THE RIVAL CAN MAKE A DOUBLE MOVE
    console.log("5. VALIDATE IF THE RIVAL CAN MAKE A DOUBLE MOVE");
    var index = canMakeDoubleMove(rivalColor, rivalColor);
    if (index != -1) {
        console.log("Rival: puede hacer doble jugada, bloqueando...");
        return index;
    } console.log("");

    // 6. ANALYZE IF THERE IS A POSSIBILITY THAT THE RIVAL CAN BUILD A DOUBLE PLAY.
    console.log("6. ANALYZE IF THERE IS A POSSIBILITY THAT THE RIVAL CAN BUILD A DOUBLE PLAY.");
    index = canBuildDobleMove(rivalColor, cpuColor);
    if (index != -1) {
        console.log("Rival puede armar doble jugada, bloqueando...");
        return index;
    } console.log("");

    // 7. ANALYZE IF THERE IS A POSSIBILITY THAT THE COMPUTER CAN BUILD A DOUBLE PLAY.
    console.log("7. ANALYZE IF THERE IS A POSSIBILITY THAT THE COMPUTER CAN BUILD A DOUBLE PLAY.");
    index = canBuildDobleMove(cpuColor, rivalColor);
    if (index != -1) {
        console.log("Tratando de armar doble jugada");
        return index;
    } console.log("");

    // 8. TO SEARCH THE MOST APPROPIATE NEXT MOVE
    console.log("8. TO SEARCH THE MOST APPROPIATE NEXT MOVE");
    index = nextMove(cpuColor, rivalColor);
    if (index != -1) {
        console.log("Next move...");
        return index;
    } console.log("");

    // 8. Finally, is there is not possibly next move, there is no option
    console.log("8. Finally, is there is not possibly next move, there is no option");
    var indices = allPosiblesIndex();
    let size = indices.length;
    return (size > 0) ? indices[getRandomInt(0, size)] : -1;
}







///////////////////////////////////////////////////////////////////////////////////////
// TEMPORAL FUNCTIONS, DELETE -->
///////////////////////////////////////////////////////////////////////////////////////
/* printBoard(); */
function printBoard() {
    document.write(
        '<table id="mytable" style="background-color:blue" border="1px" cellspacing="10px" cellpadding="20px">'
    );
    var inicio = true;
    var count = 0;
    for (var i = 0; i < matrix.length; i++) {

        if (inicio) {
            document.write("<tr>");
            inicio = false;
        }
        if (matrix[i] == 0)
            document.write('<td style="background-color:white">' + i + '</td>');
        else if (matrix[i] == 1)
            document.write('<td style="background-color:yellow">' + i + '</td>');
        else
            document.write('<td style="background-color:red">' + i + '</td>');

        count++;

        if (count == n) {
            document.write("</tr>");
            count = 0;
            inicio = true;
        }
    }
    document.write(
        '</table>'
    );
}

function insert(index, color) {
    matrix[index] = color;
    var color = (color == 1) ? "Amarilla" : "Roja";
    return color + " -----> " + index;
}

var turn = 1;
function makeMove() {
    var index;
    var msj = "";

    if (turn == 1) {
        index = CPU_IA(turn, 2);
        msj = insert(index, turn);
    } else {
        index = CPU_IA(turn, 1);
        msj = insert(index, turn);
    }
    turn = (turn == 1) ? 2 : 1;
    printBoard();
    return msj;
}

var pause = false;
function p() {
    (pause == true) ? console.log("Game reanulated") : console.log("Game in pause");
    (pause == true) ? pause = false : pause = true;
}

async function play(seconds) {

    var total = n * n - 1;

    printBoard();
    while (total > 0) {

        await new Promise(r => setTimeout(r, seconds * 1000));

        if (!pause) {
            var tempTurn = turn;
            document.getElementById("mytable").remove();
            console.log(makeMove());

            var indiceGanador = validateWin(tempTurn);
            if (indiceGanador.length > 0) {
                console.log("El jugador " + tempTurn + " ganó en [" + indiceGanador + "]");
                return;
            }

            total--;
            console.log("...........................");
        }
    }
    console.log("Empate");
    return "Empate";
}

function printObject(dict) {
    //document.write(JSON.stringify(dict, null, 4));
    console.log(JSON.stringify(dict, null, 4));
}

function printMatrix() {
    var c = 0;
    for (var i = 0; i < matrix.length; i++) {
        ;
        text = matrix[i] + "  |  ";
        document.write(text);
        c++;
        if (c == n) {
            document.write("<br>");
            c = 0;
        }
    }
    document.write("<br>");
}

function restartMatrix() {
    for (var i = 0; i < matrix.length; i++) {
        matrix[i] = 0;
    }
}