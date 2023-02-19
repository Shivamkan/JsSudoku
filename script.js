let myC = document.getElementById("myCanvas");
var dimension = [window.innerWidth, window.innerHeight];
let myCanvas = myC.getContext("2d");
let size = Math.min(dimension[0],dimension[1])*0.9;
let temp = genSudokuBoard()
let board = temp[0]
let solution = temp[1]


{
	myC.width = size;
	myC.height = size;
	myC.style.left = String(((dimension[0]-size)/2));
	myC.style.top = String(((dimension[1]-size)/2));
	myC.style.position = "absolute"} //resizing canvas and centering it.

drawSudokuGrid()
drawBoard(board, solution)

function drawSudokuGrid(){
	for(i=1;i<=8;i++){
		if(!(i%3)){
			drawLine(myCanvas, [(size*i)/9,0],[(size*i)/9,size],3 ,"#FF0000")
			drawLine(myCanvas, [0,(size*i)/9],[size,(size*i)/9],3 ,"#FF0000")
		}
		else{
			drawLine(myCanvas, [(size*i)/9,0],[(size*i)/9,size])
			drawLine(myCanvas, [0,(size*i)/9],[size,(size*i)/9])
		}
	}
}

function clearSudokuBox(pos){
	let x = ((pos[0])*(size/9))+1
	if (!(pos[0]%3))x+=1;
	let y = ((pos[1])*(size/9))+1
	if (!(pos[1]%3))y+=1;
	let width = (size/9)-3
	if (!(pos[0]+1%3))width-=2;
	let height = (size/9)-3
	if (!(pos[1]+1%3))height-=2;
	// console.log(x,y)
	myCanvas.clearRect(x,y,width,height)
}

function clearSudokuBoard() {
	for(x=0;x<=9;x++){
		for(y=0;y<=9;y++){
			clearSudokuBox([x,y])
		}
	}
}

function genSudokuBoard(){
	let base = 3
	let side = base * base

	function pattern(r, c){
		return (base * (r % base) + Math.floor(r / base) + c) % side
	}
	function shuffle(s){
		return sample(s, s.length)
	}

	let rBase = range(base)
	let rows = []
	let S1rBase = shuffle(rBase)
	for(a=0;a<S1rBase.length;a++){
		r = S1rBase[a];
		let S2rBase = shuffle(rBase);
		for (b=0;b<S1rBase.length;b++){
			g = S1rBase[b];
			rows.push(g * base + r)
		}
	}

	let cols = []
	S1rBase = shuffle(rBase)
	for(a=0;a<S1rBase.length;a++){
		r = S1rBase[a];
		let S2rBase = shuffle(rBase);
		for (b=0;b<S1rBase.length;b++){
			g = S1rBase[b];
			cols.push(g * base + r)
		}
	}
	let nums = shuffle(range(1, base * base + 1))

	//board = [[nums[pattern(r, c)] for c in cols] for r in rows]
	let board =[];
	for(a=0;a<rows.length;a++){
		let r = rows[a];
		let temp = []
		for(b=0;b<rows.length;b++){
			let c = cols[b];
			temp.push(nums[pattern(r, c)])
		}
		board.push(temp.slice())
	}
	let squares = side * side
	let empties = Math.floor(squares * 3 / 4)

	let sol = []
	for(a=0;a<board.length;a++){
		// console.log(board[a].type)
		x = board[a].slice()
		sol.push(x)
	}

	let t = sample(range(squares), empties)
	for(a=0;a<t.length;a++){
		p = t[a]
		board[Math.floor(p/side)][p % side] = 0
	}

	return [board, sol]
}

function drawBoard(board,currentBoard){
	for(i=0; i<currentBoard.length;i++){
		let out = ""
		for(j=0;j<currentBoard[i].length;j++){
			out+=String(board[i][j])
			let pos = [(size/9)*i+(size/18),(size/9)*j+(size/18)]
			let text = String(currentBoard[i][j])
			let width = 1
			if (board[i][j]!=0){
				drawText(myCanvas, pos, text, size/9, width, "#000000", "#FF0000", 'center', 'middle')
			}
			else{
				drawText(myCanvas, pos, text, size/9, width, "#000000", undefined, 'center', 'middle')
			}
		}
	}
}