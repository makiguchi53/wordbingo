process.stdin.resume();
process.stdin.setEncoding('utf8');

let lines = [];
let reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
reader.on('line', (line) => {
    lines.push(line);
});
//標準入力のデータを処理する。
reader.on('close', () => {
    const square_length = parseInt(lines[0]);　//S
    const word_count = parseInt(lines[square_length + 1]); //N
    
    //単語wを配列に代入
    let w = [];
    for(n = 0; n < word_count; n++){
        w[n] = lines[n + square_length + 2] //単語w
    }

    //単語Aを配列に代入
    let a = [];
    for (let l = 0; l < square_length ; l++) {
	a[l] = [];　//多次元配列の宣言	
    }
    for(let i = 0; i < square_length; i++){
        let s = lines[i + 1];
        let t = s.split(' ');
        for(let j = 0; j < square_length; j++){
            a[i][j] = t[j];　//単語A
        }
    }

    //単語Aと単語wの突合
    let row = [];
    let col = [];
    let match = 0;
    for(let i = 0; i < square_length; i++){
        for(let j = 0; j < square_length; j++){
            for(let n = 0; n < word_count; n++){
                    if(a[i][j] == w[n]){　//一致した単語の位置情報を配列に入力
                        row[match] = i;　
                        col[match] = j;
                        match++;
                    }
            }
        }
    }

    //判定
    let count_left = 0;
    let count_right = 0;
    let yn = 0;
    judge:for(let m = 0; m < match; m++){
        let count_row = 0;
        let count_col = 0;
        if(row[m] - col[m] == 0){ //左斜め判定
            count_left++;
            if(count_left == square_length - 1){
                yn++;
                break judge;
            }
        }
        if(row[m] + col[m] == square_length - 1){　//右斜め判定
            count_right++;
            if(count_right == square_length){
                yn++;
                break judge;
            }
        }
        for(let n = m + 1; n < match; n++){
            if(row[m] == row[n]){　//行判定
                count_row++;
                if(count_row == square_length - 1){
                    yn++;
                    break judge;
                }
            }
            if(col[m] == col[n]){　//列判定
                count_col++;
                if(count_col == square_length - 1){
                    yn++;
                    break judge;
                }
            }
        }
    }

    //結果出力
    if(yn == 0){
        console.log("no");
    }else {
        console.log("yes");
    }
});

