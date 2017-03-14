var game;
var CreateGame = function() {
    this.playersArray = [];
    //in playsMadeArr 0 = not played space, 1 = X played and 2 = O played
    this.playsMadeArr = [];
    this.current_player = 'X';
    this.gameBoardSize = null;
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
        // if (this.gameBoardSize === "three") {
        //     size = 9;
        // } else {
        //     size = 25;
        // }
        // for (var i = 0; i < size; i++) {
        //     var cell = $("<div>", {
        //         class : "ttt_cell"
        //     });
        //     if (size === 9) {
        //         $(".game_board_three").append(cell);
        //     } else {
        //         $(".game_board_five").append(cell);
        //     }
        // }
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
    this.checkWin = function() {

    };//end checkWin

    this.CellClicked = function () {
        this.checkWin();
        $(".ttt_cell").append('X');
        this.switchPlayers();

    };

    // Start of Create Players
    this.createPlayers = function () {
        var player1 = new player_template('X', $('.player1'));
        var player2 = new player_template('O',$('.player2'));
        this.playersArray.push(player1, player2);
        this.playersArray['X'].current_player();
    };//end of createPlayers

    this.switchPlayers = function (player) {
        if(this.current_player == 'X')
        {
            this.current_player = 'O';
        }else {
            this.current_player = 'X';
        }
    };//End of switchPlayers
};//end of CreateGame

var player_template = function (marker, player) {
this.marker = marker;
this.player = player;
    var active_player = function () {
        this.player.addClass('current_player')
    };
    var off_player = function () {
        this.player.removeClass('current_player')
    };
    var marker_getter = function () {
        return this.marker;
    }
};
function initialize() {
    game.addClickHandlers();
};

$(document).ready(function() {
    game = new CreateGame;
    initialize();
});
