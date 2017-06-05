function Game() {
    this.winningNumber = generateWinningNumber();
    this.playersGuess = null;
    this.pastGuesses = [];
}

function generateWinningNumber() {
    return Math.floor((Math.random() * 100) + 1);
}

function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var sample = Math.floor(Math.random() * (i + 1));
        var tem = arr[i];
        arr[i] = arr[sample];
        arr[sample] = tem;
    }

    return arr;
}
function newGame(){
    return new Game();
}


Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
    if (this.playersGuess < this.winningNumber) {
        return true;
    } else {
        return false;
    }
}

Game.prototype.checkGuess = function() {
    if (this.playersGuess === this.winningNumber) {
        $("#hint, #submit").prop("disabled",true);
        $("#subtitle").text("Press the Reset button to play");
        return 'You Win!'
    } else {
        if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        } else {
            this.pastGuesses.push(this.playersGuess);
            $("#guess-list li:nth-child("+ this.pastGuesses.length + ")").text(this.playersGuess);
            if (this.pastGuesses.length === 5) {
                $("#hint, #submit").prop("disabled",true);
                $("#subtitle").text("Press the Reset button to play");
                return 'You Lose.';
            } else {
                var diff = this.difference();
                if(this.isLower()){
                    $("#subtitle").text("Guess higher!!");
                } else {
                    $("#subtitle").text("Guess lower!!");
                }
                if (diff < 10) return 'You\'re burning up!';
                else if (diff < 25) return 'You\'re lukewarm.';
                else if (diff < 50) return 'You\'re a bit chilly.';
                else return 'You\'re ice cold!';
            }
        }
    }
}

Game.prototype.playersGuessSubmission = function(num) {
    if (typeof num !== "number" || num < 1 || num > 100) {
        throw "That is an invalid guess.";
    } else {
        this.playersGuess = num;
    }
    return this.checkGuess();
}

var newGame = function() {
    var ans = new Game();
    return ans;
}
Game.prototype.provideHint = function() {
    var ans = [this.winningNumber, generateWinningNumber(), generateWinningNumber()]
    return shuffle(ans);
}

function makeaguess(game){
    var guess = $("#player-input").val();
     $("#player-input").val("");
     var output = game.playersGuessSubmission(parseInt(guess, 10));
    $("#title").text(output);
}

 $(document).ready(function(){
     var game = new Game();
     $('#submit').on('click', function(e){
        makeaguess(game);
     });

     $("#player-input").keypress(function(event){
        if(event.which == 13){
            makeaguess(game);
        }
     })

     $("#hint").click(function(){
        var hints = game.provideHint();
        $("#title").text("The number is : " + hints[0] + ", " + hints[1] + ", " + hints[2]);
     })

     $("#reset").click(function(){
        game = newGame();
        $("#title").text("Lets Play!!!");
        $("#subtitle").text("Guess any number");
        $(".guess").text("0");
        $("#player-input").val("");
        $("#hint, #submit").prop("disabled", false);
     })

})

 
