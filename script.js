let myC = document.getElementById("myCanvas");
var dimension = [window.innerWidth, window.innerHeight];
let myCanvas = myC.getContext("2d");
let size = Math.min(dimension[0],dimension[1])*0.9;
let board, solution = genSudokuBoard()

{
	myC.width = size;
	myC.height = size;
	myC.style.left = String(((dimension[0]-size)/2));
	myC.style.top = String(((dimension[1]-size)/2));
	myC.style.position = "absolute"} //resizing canvas and centering it.

drawSudokuGrid()

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
	console.log(x,y)
	myCanvas.clearRect(x,y,width,height)
}

function genSudokuBoard(){
	let base = 3
	let side = base * base

	function pattern(r, c){
		return (base * (r % base) + Math.floor(r / base) + c) % side
	}
	function shuffle(s){
		return sample(s, len(s))
	}

	let rBase = range(base)
	let rows = []
	for r in shuffle(rBase):
		for g in shuffle(rBase):
			rows.push(g * base + r)

	let cols = []
	for r in shuffle(rBase):
		for g in shuffle(rBase):
			cols.append(g * base + r)
	let nums = shuffle(range(1, base * base + 1))

	//board = [[nums[pattern(r, c)] for c in cols] for r in rows]
	let board =[];
	for(a=0;a<rows.length;a++){
		let r = rows[a];
		for(b=0;b<rows.length;b++){
			let c = cols[b];
			board.push(nums[pattern(r, c)])
		}

	}
	let squares = side * side
	let empties = Math.floor(squares * 3 / 4)

	let sol = []
	for(a=0;a<board.length;a++):
		x = board[i]
		sol.push(x.splice())

	let t = sample(range(squares), empties)
	for(a=0;a<t.length;a++):
		p = t[a]
		board[Math.floor(p/side)][p % side] = 0

	return board, sol
}

