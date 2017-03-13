var game;
var CreateGame = function() {
    this.players = [];
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
        // $(".ttt_cell").click(this.SOMEFUNCTION.bind(this));
    };
    this.beginGame = function() {
        this.getSize();
        this.createBoard();
        this.createCells();
        this.createPlaysMade();
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
            size = 9;
        } else {
            size = 25;
        }
        for (var i = 0; i < size; i++) {
            var cell = $("<div>", {
                class : "ttt_cell"
            });
            if (size === 9) {
                $(".game_board_three").append(cell);
            } else {
                $(".game_board_five").append(cell);
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
    this.checkWin = function() {

    };//end checkWin
    // Start of Create Players
    this.createPlayers = function () {
        var player1 = $('.player1');
        var player2 = $('.player2');
        players.push(player1, player2);
    };//end of createPlayers

    this.switchPlayers = function (player) {
        if(player == 'X'){
            player1.addClass('current_player');
            player2.removeClass('current_player');
            current_player == 'O';
        }  else if (player == 'O'){
            player2.addClass('current_player');
            player1.removeClass('current_player');
            current_player == 'X';
        }
    };//End of switchPlayers
};//end of CreateGame

function initialize() {
    game.addClickHandlers();
};

$(document).ready(function() {
    game = new CreateGame;
    initialize();
});
