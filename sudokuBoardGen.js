function genSudokuBoard() {
    let base = 3;
    let side = base * base;

    function pattern(r, c) {
        return (base * (r % base) + Math.floor(r / base) + c) % side;
    }

    function shuffle(s) {
        return sample(s, s.length);
    }

    let rBase = range(base);
    let rows = [];
    let S1rBase = shuffle(rBase);
    for (let a = 0; a < S1rBase.length; a++) {
        let r = S1rBase[a];
        let S2rBase = shuffle(rBase);
        for (let b = 0; b < S1rBase.length; b++) {
            let g = S1rBase[b];
            rows.push(g * base + r);
        }
    }

    let cols = [];
    S1rBase = shuffle(rBase);
    for (let a = 0; a < S1rBase.length; a++) {
        let r = S1rBase[a];
        let S2rBase = shuffle(rBase);
        for (let b = 0; b < S1rBase.length; b++) {
            let g = S1rBase[b];
            cols.push(g * base + r);
        }
    }
    let nums = shuffle(range(1, base * base + 1));

    //board = [[nums[pattern(r, c)] for c in cols] for r in rows]
    let board = [];
    for (let a = 0; a < rows.length; a++) {
        let r = rows[a];
        let temp = [];
        for (let b = 0; b < rows.length; b++) {
            let c = cols[b];
            temp.push(nums[pattern(r, c)]);
        }
        board.push(temp.slice());
    }
    let squares = side * side;
    let empties = Math.floor(squares / 1.2);

    let sol = [];
    for (let a = 0; a < board.length; a++) {
        // console.log(board[a].type);
        let x = board[a].slice();
        sol.push(x);
    }

    let t = sample(range(squares), empties);
    for (let a = 0; a < t.length; a++) {
        let p = t[a];
        board[Math.floor(p / side)][p % side] = 0;
    }

    return [board, sol];
}

