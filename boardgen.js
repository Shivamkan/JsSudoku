// let boarda = [[0,0,0,3,7,0,0,2,0],
//     [0,9,0,0,8,5,7,0,0],
//     [3,0,0,9,0,0,0,0,5],
//     [1,0,0,0,0,0,0,8,0],
//     [0,0,0,0,0,0,3,0,0],
//     [0,0,0,0,9,0,0,0,7],
//     [2,0,0,6,0,0,0,0,1],
//     [0,4,8,0,0,0,6,0,0],
//     [0,3,0,0,0,0,0,4,0]]
let myrng = new Math.seedrandom(getAllUrlParams()["seed"])
// let boarda=[]
// for(let x=0;x<9; x++){
//     let row = [];
//     for(let y = 0;y<9; y++){
//         row.push(0);
//     }
//     boarda.push([...row]);
// }
// let empty = deepCopy(boarda)

function showboard(board){
    let out = [""]
    for(let y = 0; y<board.length; y++){
        out.push(board[y].toString()+"\n")
    }
    console.log(out.toString())
}
function validate(bo,num,pos){
    // console.log(bo)
    let x = pos[1];let y=pos[0];
    for(let i=0; i<9;i++){
        if(i===x){continue;}
        if(num===bo[y][i]){
            return false;
        }
    }
    //row check
    for(let i=0; i<9;i++){
        if(i===y){continue;}
        if(num===bo[i][x]){
            return false;
        }
    }
    //colume check
    for(let i=Math.floor(x/3)*3; i<(Math.floor(x/3)*3)+3;i++){
        for(let j=Math.floor(y/3)*3; j<(Math.floor(y/3)*3)+3;j++){
            if (i===x&&j===y){continue;}
            if(num===bo[j][i]){
                return false;
            }
        }
    }
    //3x3 box check
    return true
}

function find_empty(bo){
    for(let i=0; i< 81; i++){
        let y = Math.floor(i/9);
        let x = i%9;
        if (bo[y][x] === 0){
            return [y,x];
        }
    }
    return false;
}
function genrate_full_board(board){
    let empty = find_empty(board)
    if(empty == false){
        return board;
    }
    let x = empty[1];let y=empty[0];
    let values = [1,2,3,4,5,6,7,8,9]
    for(let num = 1; num<=9; num++){
        let l = Math.floor(myrng()*values.length)
        let value = values[l]
        values.splice(l,1)
        if (validate(board, value, empty)){
            board[y][x] = value;
            if(genrate_full_board(board)!=false){
                return board;
            }
            board[y][x] = 0;
        }
    }
    return false
}
function has_more_sol(board, other_sol){
    let empty = find_empty(board)
    if(empty == false){
        return (board.flat().toString() != other_sol.flat().toString());
    }
    let x = empty[1];let y=empty[0];
    for(let num = 1; num<=9; num++){
        if (validate(board, num, empty)){
            board[y][x] = num;
            let temp = has_more_sol(board,other_sol)
            if(temp){return temp;}
        }
        board[y][x] = 0;
    }
    return false;
}

function hide_numbers(board){
    let board1 = deepCopy(board)
    let sol = deepCopy(board)
    let to_remove = []
    let i
    let y
    let x
    while(to_remove.length<56){
        i = Math.floor(myrng()*81)
        y = Math.floor(i/9)
        x = i%9
        board1[y][x] = 0
        if(has_more_sol(board1,sol)){board1[y][x] = sol[y][x]}else{if(!to_remove.includes(i)){to_remove.push(i)}}
    }
    // console.log(to_remove)
    for(let k=0; k<to_remove.length-1; k++){
        y = Math.floor(to_remove[k]/9)
        x = to_remove[k]%9
        board1[y][x]=0
    }
    return board1
}
function gen_board(){
    let board=[]
    for(let x=0;x<9; x++){
        let row = [];
        for(let y = 0;y<9; y++){
            row.push(0);
        }
        board.push([...row]);
    }
    return genrate_full_board(board)
}

// let sol1 = genrate_full_board(boarda)
// // showboard(sol1)
// showboard(hide_numbers(sol1))

