var CreateGame = function() {
    this.players = [];
    this.current_player = 'X';
    this.gameBoardSize = $("input[name='chosen']:checked").val();
    //    below are test cases. if you comment out line above, and uncomment one of the below it
    //run based on three or five.
    // this.gameBoardSize = "five";
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

function startUp() {
    var game = new CreateGame;
    game.createBoard();
    game.createCells();
};

$(document).ready(startUp);
