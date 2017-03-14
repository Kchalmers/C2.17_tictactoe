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
        $(".ttt_cell").click(this.switchPlayers.bind(this));
        $(".start_game").on('click',$(".chosen").attr("disabled", true));
        $(".reset_game").click(this.ResetGame.bind(this));
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


        //check win
        if(rowCount >= this.winCondition || colCount >= this.winCondition) {
            if (symbolChecking === 1) {
                alert("X's Won!");
            } else {
                alert("O's Won!")
            }
        }



        // for (var i=-1; i <=1; i++) {
        //     var counter = 0;
        //     for (var j = -1; j <=1; j++){
        //         if (this.playsMadeArr.hasOwnProperty(parseInt(row)+i)) {
        //             if (this.playsMadeArr.hasOwnProperty(parseInt(col)+j)) {
        //                 if (this.playsMadeArr[parseInt(row) + i][parseInt(col) + j] === symbolChecking) {
        //                     do {
        //                         i += i;
        //                         j += j;
        //                         counter += 1;
        //                     } while (this.playsMadeArr[parseInt(row) + 1][parseInt(col) + j] === symbolChecking);
        //                     // || this.playsMadeArr[row + 1][col + j] === undefined);
        //                 }
        //             }
        //         }
        //     }
        //     if (counter >= this.winCondition) {
        //         if (symbolChecking === 1) {
        //             alert("X's Won");
        //             break;
        //         } else
        //             alert("O's Won");
        //         break;
        //     }
        // }

    };//end checkWin

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
    
    this.ResetGame = function () {
        $(".chosen").prop("disabled", false);
        player1.addClass('current_player');
        player2.removeClass('current_player');
        this.playsMadeArr = [];
        this.current_player = 'X';
        this.gameBoardSize = null;
        $('.board_location').empty();
    }
    
};//end of CreateGame
function initialize() {
    game.addClickHandlers();
}

$(document).ready(function() {
    game = new CreateGame;
    initialize();
});
