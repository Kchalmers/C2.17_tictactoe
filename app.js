var CreateGame = function() {
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
};//end of CreateGame

function startUp() {
    var game = new CreateGame;
    game.createBoard();
    game.createCells();
};

$(document).ready(startUp);
