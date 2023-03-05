let myC = document.getElementById("myCanvas");
let dimension = [window.innerWidth, window.innerHeight];
let myCanvas = myC.getContext("2d");
let size = Math.min(dimension[0], dimension[1]) * 0.9;
let temp = genSudokuBoard();
let board = temp[0];
let solution = temp[1];
let UIright = true;
let selected = null;
let currentBoard = deepCopy(board)


function setup() {
    dimension = [window.innerWidth, window.innerHeight];
    size = Math.min(dimension[0], dimension[1]) * 0.9;
    if (dimension[0] * 10 / 9 > dimension[1]) {
        myC.width = size * 10 / 9;
        myC.height = size;
        myC.style.left = String(((dimension[0] - size * 10 / 9) / 2));
        myC.style.top = String(((dimension[1] - size) / 2));
        UIright = true;
    } else {
        myC.width = size;
        myC.height = size * 10 / 9;
        myC.style.left = String(((dimension[0] - size) / 2));
        myC.style.top = String(((dimension[1] - size * 10 / 9) / 2));
        UIright = false;
    }
    reDrawBoard()
} //resizing canvas and centering it.

myC.style.position = "absolute";
setup();
// drawSudokuGrid()
// drawBoard(board, solution)
// drawUI()

myC.addEventListener('mousedown', function (e) {
    let cursorPosition = getCursorPosition(myC, e)
    let temp = getGridPos(cursorPosition);
    if(temp !== false){
        // console.log(temp,selected)
        if(board[temp[0]][temp[1]] !== 0){
            selected = null;
            reDrawBoard();
        } else if(selected !== null) {
            if (selected[0] === temp[0] && selected[1] === temp[1]) {
                selected = null;
                reDrawBoard();
            }else {
                selected = deepCopy(temp)
                reDrawBoard();
            }
        }else {
            selected = deepCopy(temp)
            reDrawBoard();
        }
        return
    }
    temp = getUIButton(cursorPosition)
    if(temp !== false && temp !== null){
        if(selected){
            currentBoard[selected[0]][selected[1]] = temp;
            selected = null;
            reDrawBoard();
        }
    }
})

// window.addEventListener('resize', () => {
//     setup();
// })


function drawSudokuGrid() {
    for (let i = 1; i <= 9; i++) {
        if (i === 9) {
            drawLine(myCanvas, [(size * i) / 9, 0], [(size * i) / 9, size], 5, "#000000");
            drawLine(myCanvas, [0, (size * i) / 9], [size, (size * i) / 9], 5, "#000000");
        } else if (!(i % 3)) {
            drawLine(myCanvas, [(size * i) / 9, 0], [(size * i) / 9, size], 3, "#FF0000");
            drawLine(myCanvas, [0, (size * i) / 9], [size, (size * i) / 9], 3, "#FF0000");
        } else {
            drawLine(myCanvas, [(size * i) / 9, 0], [(size * i) / 9, size]);
            drawLine(myCanvas, [0, (size * i) / 9], [size, (size * i) / 9]);
        }
    }
}

function reDrawBoard(){
    drawRect(myCanvas,[0,0],[size/0.9,size/0.9],'#FFFFFF');
    drawSudokuGrid()
    drawUI()
    drawBoard(board, currentBoard);
    if(selected !== null){
        highlightBox(selected);
    }
}

function clearSudokuBox(pos) {
    let x = ((pos[0]) * (size / 9)) + 1;
    if (!(pos[0] % 3)) x += 1;
    let y = ((pos[1]) * (size / 9)) + 1;
    if (!(pos[1] % 3)) y += 1;
    let width = (size / 9) - 3;
    if (!(pos[0] + 1 % 3)) width -= 2;
    let height = (size / 9) - 3;
    if (!(pos[1] + 1 % 3)) height -= 2;
    // console.log(x,y)
    myCanvas.clearRect(x, y, width, height);
}

function clearSudokuBoard() {
    for (let x = 0; x <= 8; x++) {
        for (let y = 0; y <= 8; y++) {
            clearSudokuBox([x, y]);
        }
    }
}

function drawBoard(board, currentBoard) {
    for (let i = 0; i < currentBoard.length; i++) {
        for (let j = 0; j < currentBoard[i].length; j++) {
            let pos = [(size / 9) * i + (size / 18), (size / 9) * j + (size / 18)];
            let text = String(currentBoard[i][j]);
            let width = 1;
            if (board[i][j] !== 0) {
                if(text !== "null" && text !== '0') {
                    drawText(myCanvas, pos, text, size / 9, width, "#000000", "#FF0000", 'center', 'middle');
                }
            } else {
                if(text !== "null"  && text !== '0') {
                    drawText(myCanvas, pos, text, size / 9, width, "#000000", undefined, 'center', 'middle');
                }
            }
        }
    }
}

function highlightBox(pos){
    let x = pos[0]*size/9
    let y = pos[1]*size/9
    drawRect(myCanvas, [x,y],[size/9,size/9],"rgba(0,250,0,0.2)")
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
}

function drawUI() {
    for (let i = 1; i <= 9; i++) {
        if (UIright) {
            let pos = [size + (size / 18), ((size * (i-1)) / 9) + (size / 18)];
            drawLine(myCanvas, [size, (size * i) / 9], [size * 10 / 9, (size * i) / 9]);
            drawText(myCanvas, pos, String(i), size / 9, 1, "#000000", "#00FF00", 'center', 'middle');
        } else {
            let pos = [((size * (i-1)) / 9) + (size / 18), size + (size / 18)];
            drawLine(myCanvas, [(size * i) / 9, size], [(size * i) / 9, size * 10 / 9]);
            drawText(myCanvas, pos, String(i), size / 9, 1, "#000000", "#00FF00", 'center', 'middle');
        }
    }
}

function getGridPos(cursorPos){
    if(cursorPos[0] > size || cursorPos[1] > size){
        return false;
    }
    let x = Math.floor(cursorPos[0]/(size/9));
    let y = Math.floor(cursorPos[1]/(size/9));
    return [x, y];
}

function getUIButton(cursorPos){
    if (cursorPos[0] < size && cursorPos[1] < size){
        return false
    }
    if (UIright){
        return Math.floor(cursorPos[1]/(size/9))+1
    }else{
        return Math.floor(cursorPos[0]/(size/9))+1
    }
}