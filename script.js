let myC = document.getElementById("myCanvas");
let dimension = [window.innerWidth, window.innerHeight];
let myCanvas = myC.getContext("2d");
let size = Math.min(dimension[0], dimension[1]) * 0.9;
let temp = genSudokuBoard()
let board = temp[0]
let solution = temp[1]
let UIright = true


function setup() {
    dimension = [window.innerWidth, window.innerHeight];
    if (dimension[0] * 10 / 9 > dimension[1]) {
        myC.width = size * 10 / 9;
        myC.height = size;
        myC.style.left = String(((dimension[0] - size * 10 / 9) / 2));
        myC.style.top = String(((dimension[1] - size) / 2));
        UIright = true
    } else {
        myC.width = size;
        myC.height = size * 10 / 9;
        myC.style.left = String(((dimension[0] - size) / 2));
        myC.style.top = String(((dimension[1] - size * 10 / 9) / 2));
        UIright = false
    }
    size = Math.min(dimension[0], dimension[1]) * 0.9;
    drawSudokuGrid()
    drawBoard(board, solution)
    drawUI()
} //resizing canvas and centering it.

myC.style.position = "absolute"
setup()
// drawSudokuGrid()
// drawBoard(board, solution)
// drawUI()

myC.addEventListener('mousedown', function (e) {
    getCursorPosition(myC, e)
})

window.addEventListener('resize', () => {
    console.log("Resize");
    setup();
})


function drawSudokuGrid() {
    for (let i = 1; i <= 9; i++) {
        if (i === 9) {
            drawLine(myCanvas, [(size * i) / 9, 0], [(size * i) / 9, size], 5, "#000000")
            drawLine(myCanvas, [0, (size * i) / 9], [size, (size * i) / 9], 5, "#000000")
        } else if (!(i % 3)) {
            drawLine(myCanvas, [(size * i) / 9, 0], [(size * i) / 9, size], 3, "#FF0000")
            drawLine(myCanvas, [0, (size * i) / 9], [size, (size * i) / 9], 3, "#FF0000")
        } else {
            drawLine(myCanvas, [(size * i) / 9, 0], [(size * i) / 9, size])
            drawLine(myCanvas, [0, (size * i) / 9], [size, (size * i) / 9])
        }
    }
}

function clearSudokuBox(pos) {
    let x = ((pos[0]) * (size / 9)) + 1
    if (!(pos[0] % 3)) x += 1;
    let y = ((pos[1]) * (size / 9)) + 1
    if (!(pos[1] % 3)) y += 1;
    let width = (size / 9) - 3
    if (!(pos[0] + 1 % 3)) width -= 2;
    let height = (size / 9) - 3
    if (!(pos[1] + 1 % 3)) height -= 2;
    // console.log(x,y)
    myCanvas.clearRect(x, y, width, height)
}

function clearSudokuBoard() {
    for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 9; y++) {
            clearSudokuBox([x, y])
        }
    }
}

function genSudokuBoard() {
    let base = 3
    let side = base * base

    function pattern(r, c) {
        return (base * (r % base) + Math.floor(r / base) + c) % side
    }

    function shuffle(s) {
        return sample(s, s.length)
    }

    let rBase = range(base)
    let rows = []
    let S1rBase = shuffle(rBase)
    for (let a = 0; a < S1rBase.length; a++) {
        let r = S1rBase[a];
        let S2rBase = shuffle(rBase);
        for (let b = 0; b < S1rBase.length; b++) {
            let g = S1rBase[b];
            rows.push(g * base + r)
        }
    }

    let cols = []
    S1rBase = shuffle(rBase)
    for (let a = 0; a < S1rBase.length; a++) {
        let r = S1rBase[a];
        let S2rBase = shuffle(rBase);
        for (let b = 0; b < S1rBase.length; b++) {
            let g = S1rBase[b];
            cols.push(g * base + r)
        }
    }
    let nums = shuffle(range(1, base * base + 1))

    //board = [[nums[pattern(r, c)] for c in cols] for r in rows]
    let board = [];
    for (let a = 0; a < rows.length; a++) {
        let r = rows[a];
        let temp = []
        for (let b = 0; b < rows.length; b++) {
            let c = cols[b];
            temp.push(nums[pattern(r, c)])
        }
        board.push(temp.slice())
    }
    let squares = side * side
    let empties = Math.floor(squares * 3 / 4)

    let sol = []
    for (let a = 0; a < board.length; a++) {
        // console.log(board[a].type)
        let x = board[a].slice();
        sol.push(x);
    }

    let t = sample(range(squares), empties)
    for (let a = 0; a < t.length; a++) {
        let p = t[a];
        board[Math.floor(p / side)][p % side] = 0;
    }

    return [board, sol];
}

function drawBoard(board, currentBoard) {
    for (let i = 0; i < currentBoard.length; i++) {
        for (let j = 0; j < currentBoard[i].length; j++) {
            let pos = [(size / 9) * i + (size / 18), (size / 9) * j + (size / 18)]
            let text = String(currentBoard[i][j])
            let width = 1
            if (board[i][j] != 0) {
                drawText(myCanvas, pos, text, size / 9, width, "#000000", "#FF0000", 'center', 'middle')
            } else {
                drawText(myCanvas, pos, text, size / 9, width, "#000000", undefined, 'center', 'middle')
            }
        }
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

function drawUI() {
    for (let i = 1; i <= 9; i++) {
        if (UIright) {
            let pos = [size + (size / 18), ((size * (i-1)) / 9) + (size / 18)]
            drawLine(myCanvas, [size, (size * i) / 9], [size * 10 / 9, (size * i) / 9])
            drawText(myCanvas, pos, String(i), size / 9, 1, "#000000", "#00FF00", 'center', 'middle')
        } else {
            let pos = [((size * (i-1)) / 9) + (size / 18), size + (size / 18)]
            drawLine(myCanvas, [(size * i) / 9, size], [(size * i) / 9, size * 10 / 9])
            drawText(myCanvas, pos, String(i), size / 9, 1, "#000000", "#00FF00", 'center', 'middle')
        }
    }
}