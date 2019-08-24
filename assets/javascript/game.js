var animal = [["l", "i", "o", "n"],["t", "i", "g", "e", "r"],["b", "e", "a", "r"],["e","a","g","l","e"],["e","l","e","p","h","a","n","t"]];
var wins = 0;
var startMessage = document.getElementById("startMessage-text");
var computerChoice = document.getElementById("wordSize-text");
var remainingGuess = document.getElementById("remaining-text");
var incorrectGuess = document.getElementById("incorrectGuess-text");
var winsText = document.getElementById("wins-text");
var tryAgain = document.getElementById("tryAgain-text");
var answerText = document.getElementById("answer-text");

function playgame(){
    var animalSelect = animal[Math.floor(Math.random() * animal.length)];
    var allGuesses = [];
    var wordSize = [];
    var spliceCount = 0;
    var remaining = 13;
    var userIncorrect = "";

    for (var i=0; i < animalSelect.length; i++){
        wordSize[i] = "_ ";
    };
    computerChoice.textContent = ("Current word: " + wordSize.join(""));
    remainingGuess.textContent = ("Number of guesses remaining: " + remaining);
    incorrectGuess.textContent = ("Letters already guessed: None");
    winsText.textContent = ("Wins: " + wins);

    document.onkeyup = function(event) {
        var userGuess = event.key;
        var answer = "";
        var upperCase = "";

        tryAgain.textContent = (" ");
        if (event.keyCode < 65 || event.keyCode > 90){
            return;
        };
        if (allGuesses.length > 0){
            for (var i=0; i < allGuesses.length; i++){
                if (allGuesses[i] === userGuess){
                    return;
                };
            };
        };
        allGuesses.push(userGuess);
        for (var i=0; i < animalSelect.length; i++){
                if (userGuess === animalSelect[i]) {
                    wordSize.splice(i, 1, userGuess);
                    computerChoice.textContent = ("Current word: " + wordSize.join(""));
                    spliceCount++;
                    if (spliceCount === animalSelect.length){
                        wins++;
                        winsText.textContent = ("Wins: " + wins);
                        tryAgain.textContent = ("Winner! Play again!");
                        answer = animalSelect.join("");
                        answer = answer.toUpperCase();
                        answerText.textContent = ("Last winning word: " + answer);
                        playgame();
                    };
                };
                if (spliceCount !== animalSelect.length && i === (animalSelect.length - 1)){
                    remaining--;
                    remainingGuess.textContent = ("Number of guesses remaining: " + remaining);
                    userIncorrect = (userIncorrect + userGuess + " ");
                    upperCase = userIncorrect.toUpperCase();
                    incorrectGuess.textContent = ("Letters already guessed: " + upperCase);
                    if (remaining === 0){
                        tryAgain.textContent = ("Try again!");
                        playgame();
                    };
                };
            };
    };
};

startMessage.textContent = ("Press any key to get started!");
answerText.textContent = ("Good luck!");
document.onkeyup = function(event) {
    playgame();
};