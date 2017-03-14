var game;
var CreateGame = function() {
    var player1 = $('.player1');
    var player2 = $('.player2');
    player1.addClass('current_player');
    //in playsMadeArr 0 = not played space, 1 = X played and 2 = O played
    this.playsMadeArr = [];
    this.current_player = 'X';
    this.gameBoardSize = null;
    this.winCondition = null;
    this.userWinCondition = function () {
        this.winCondition = $("input[name='match']:checked").val();
    };
    this.getSize = function() {
        this.gameBoardSize = $("input[name='chosen']:checked").val();
    };
    // this.gameBoardSize = "five";
    this.addClickHandlers = function() {
        $(".start_game").click(this.beginGame.bind(this));
    };
    this.beginGame = function() {
        this.getSize();
        this.createBoard();
        this.createCells();
        this.createPlaysMade();
        $(".ttt_cell").click(this.CellClicked.bind(this));
        $(".start_game").on('click',$(".chosen").attr("disabled", true))
    };
    this.createBoard = function() {
        if(this.gameBoardSize === "three") {
            var board = $("<div>", {
                class : "game_board_three"
            });
            canClick = true;
        } else {
            board = $("<div>", {
                class : "game_board_five"
            });
            canClick = false;
        }
        $(".board_location").append(board);
    }; // end of createBoard
    this.createCells = function() {
        var size = null;
        if (this.gameBoardSize === "three") {
            size = 3;
        } else {
            size = 5;
        }
        for (var i = 0; i < size; i++) {
            for (var j = 0; j< size; j++) {
                var cell = $("<div>", {
                    class: "ttt_cell",
                    "row": i,
                    "col": j
                });
                if (size === 3) {
                    $(".game_board_three").append(cell);
                } else {
                    $(".game_board_five").append(cell);
                }
            }
        }
    };//end of createCells
    this.createPlaysMade = function() {
        var size;
        if (this.gameBoardSize === "three") {
            size = 3;
        } else {
            size = 5;
        }
        for(var i=0; i < size; i++){
            var temp = [];
            this.playsMadeArr.push(temp);
            for (var j=0; j< size; j++){
                this.playsMadeArr[i][j] = 0;
            }
        }
    };
    this.checkWin = function(row, col, symbolChecking) {
        this.userWinCondition();
        if (this.winCondition === "three") {
            this.winCondition = 3;
        } else {
            this.winCondition = 5;
        }
        var size = null;
        if (this.gameBoardSize === "three") {
            size = 3;
        } else {
            size = 5;
        }
        //check row
        var rowCount = 0;
        for (var i = 0; i < this.playsMadeArr.length; i++) {
            if(this.playsMadeArr[row][i]===symbolChecking) {
                rowCount += 1;
            } else {
                if (rowCount < this.winCondition) {
                    rowCount = 0;
                }
            }
        }
        //check columns
        if (!(rowCount >= this.winCondition)) {
            var colCount = 0;
            for (var j = 0; j < this.playsMadeArr.length; j++) {
                if(this.playsMadeArr[j][col]===symbolChecking) {
                    colCount += 1;
                } else {
                    if(colCount < this.winCondition) {
                        colCount = 0;
                    }
                }
            }
        }
        //checks diagonal
        if (!(rowCount >= this.winCondition) || !(colCount >= this.winCondition)) {
            var upLeft = [];
            var upRight = [];
            var downLeft = [];
            var downRight = [];
            var currentRow = parseInt(row);
            var currentCol = parseInt(col);
            for (var i = 0; i < size; i++) {
                if (this.playsMadeArr.hasOwnProperty(currentRow - i)) {
                    if (this.playsMadeArr.hasOwnProperty(currentCol - i)) {
                        upLeft.push(this.playsMadeArr[currentRow - i][currentCol - i]);
                    }
                }
                if (this.playsMadeArr.hasOwnProperty(currentRow - i)) {
                    if (this.playsMadeArr.hasOwnProperty(currentCol + i)) {
                        upRight.push(this.playsMadeArr[currentRow - i][currentCol + i]);
                    }
                }
                if (this.playsMadeArr.hasOwnProperty(currentRow + i)) {
                    if (this.playsMadeArr.hasOwnProperty(currentCol - i)) {
                        downLeft.push(this.playsMadeArr[currentRow + i][currentCol - i]);
                    }
                }
                if (this.playsMadeArr.hasOwnProperty(currentRow + i)) {
                    if (this.playsMadeArr.hasOwnProperty(currentCol + i)) {
                        downRight.push(this.playsMadeArr[currentRow + i][currentCol + i]);
                    }
                }
            }
            downRight.shift();
            var leftDiagonalComplete = upLeft.reverse().concat(downRight);
            upRight.shift();
            var rightDiagonalComplete = downLeft.reverse().concat(upRight);
            var countLeft = 0;
            for (var j = 0; j<leftDiagonalComplete.length; j++) {
                if (leftDiagonalComplete[j] === symbolChecking) {
                    countLeft += 1;
                } else if (countLeft < this.winCondition) {
                    countLeft = 0;
                }
            } if (countLeft < this.winCondition) {
                var countRight = 0;
                for (var k = 0; k < rightDiagonalComplete.length; k++) {
                    if (rightDiagonalComplete[k] === symbolChecking) {
                        countRight += 1;
                    } else if (countRight < this.winCondition) {
                        countRight = 0;
                    }
                }
            }
        }
        //check win
        if(rowCount >= this.winCondition || colCount >= this.winCondition
        || countLeft >= this.winCondition || countRight >= this.winCondition) {
            if (symbolChecking === 1) {
                alert("X's Won!");
            } else {
                alert("O's Won!")
            }
        }
    };//end checkWin

    this.CellClicked = function () {
        // this.checkWin();
        this.switchPlayers();

    };
    this.switchPlayers = function (player) {
        var self = event.target;
        var row = $(self).attr('row');
        var col = $(self).attr('col');
        if(this.current_player == 'X')
        {
            this.playsMadeArr[row][col] = 1;
            $(self).text("X");
            this.checkWin(row, col, 1);
            this.current_player = 'O';
            player2.addClass('current_player');
            player1.removeClass('current_player');
        }else {
            this.playsMadeArr[row][col] = 2;
            $(self).text("O");
            this.checkWin(row, col, 2)
            this.current_player = 'X';
            player1.addClass('current_player');
            player2.removeClass('current_player');
        }
    };//End of switchPlayers
};//end of CreateGame
function initialize() {
    game.addClickHandlers();
}

$(document).ready(function() {
    game = new CreateGame;
    initialize();
});
