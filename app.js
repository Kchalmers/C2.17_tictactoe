var game;
var CreateGame = function() {
    //this.playersArray = [];
    //in playsMadeArr 0 = not played space, 1 = X played and 2 = O played
    this.playsMadeArr = [];
    this.current_player = 'X';
    this.gameBoardSize = null;
    this.winCondition = null;
    this.userWinCondition = function () {
        this.winCondition = $("input[name='match']:checked").val();
    }
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
    };
    this.createBoard = function() {
        if(this.gameBoardSize === "three") {
            var board = $("<div>", {
                class : "game_board_three"
            });
        } else {
            board = $("<div>", {
                class : "game_board_five"
            });
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

    this.CellClicked = function () {
        // this.checkWin();
        this.switchPlayers();

    };

    // Start of Create Players
    // this.createPlayers = function () {
    //     var player1 = new player_template('X', $('.player1'));
    //     var player2 = new player_template('O',$('.player2'));
    //     this.playerArray.push(player1, player2);
    //     this.playerArray[0].current_player();
    // };//end of createPlayers
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
        }else {
            this.playsMadeArr[row][col] = 2;
            $(self).text("O");
            this.checkWin(row, col, 2)
            this.current_player = 'X';
        }
    };//End of switchPlayers
};//end of CreateGame

// var player_template = function (marker, player) {
// this.marker = marker;
// this.player = player;
//     var active_player = function () {
//         this.player.addClass('current_player')
//     };
//     var off_player = function () {
//         this.player.removeClass('current_player')
//     };
//     var marker_getter = function () {
//         return this.marker;
//     }
// };
function initialize() {
    game.addClickHandlers();
}

$(document).ready(function() {
    game = new CreateGame;
    initialize();
});
