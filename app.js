var game;
var CreateGame = function() {
    this.playerArray = [];
    this.current_player = 'X';
    this.gameBoardSize = $("input[name='chosen']:checked").val();
    //    below are test cases. if you comment out line above, and uncomment one of the below it
    //run based on three or five.
    // this.gameBoardSize = "five";
    this.addClickHandlers = function() {
        $(".start_game").click(this.beginGame.bind(this));
        // $(".ttt_cell").click(this.SOMEFUNCTION.bind(this));
    }
    this.beginGame = function() {
        this.createBoard();
        this.createCells();
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
    // Start of Create Players
    this.createPlayers = function () {
        var player1 = new player_template('X', $('.player1'));
        var player2 = new player_template('O',$('.player2'));
        this.playerArray.push(player1, player2);
        this.playerArray[0].current_player();
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

};
function initialize() {
    game.addClickHandlers();
};

$(document).ready(function() {
    game = new CreateGame;
    initialize();
});
