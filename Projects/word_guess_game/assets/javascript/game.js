var guessedLetters = []; //what youve guessed so far
var wordPool = [
    "iris", "anemone", "daffodil", "sunflower", "daisy", "orchid", "hyacinth", "tulip", "rose", "rose", "lilac", "magnolia", "gardenia", "dahlia", "jasmine", "buttercup", "chrysanthemum", "cherryblossom", "lavender", "aster", "marigold", "amaryllis", "snapdragon", "violet", "lotus", "pansy",
]; //wordlist
//Getting a random word from the pool
var wordIndex = [Math.floor(Math.random() * wordPool.length)]; //random index of a word in the list
var theWord = wordPool[wordIndex]; //the actual answer
var wordLength = theWord.length; //how long the answer is 
var lettersRemain = theWord.length;
var onScreen = [wordLength]; //array of the length of the answer
var currentGuess = ""; //displayed word progress
var guess = ""; //user input
var letters = theWord.split(''); //individual letters of the word

var emptyWordVisible = document.getElementById("emptyWord"); //make things shorters
var guessesLeftVisible = document.getElementById("guessesLeft");
var guessedLettersVisible = document.getElementById("guessedLetters");

var guessesLeft = 8; //number of guesses
var loseCounter = 0; //number of losses
var winCounter = 0; //number of wins
var correctLetters = [];

var gameStarted = false;

function resetGame() //resets the game when you win or lose
{
    gameStarted = true;
    emptyWordVisible.classList.remove("green", "red");
    guessesLeft = 8;
    wordIndex = [Math.floor(Math.random() * wordPool.length)];
    theWord = wordPool[wordIndex];
    onScreen = [theWord.length];
    letters = theWord.split('');
    lettersRemain = theWord.length;
    correctLetters = [];
    guessedLetters = [];
    guessedLettersVisible.textContent = "You have guessed: " + guessedLetters;
    for (var i = 0; i < theWord.length; i++) {
        onScreen[i] = "_ ";
        currentGuess = currentGuess + onScreen[i];
    }
    emptyWordVisible.textContent = currentGuess;
    guessesLeftVisible.textContent = guessesLeft + " guesses left.";
    currentGuess = "";
    //console.log(letters);
    //console.log(theWord);
}

function gameStatus() { //checks if youve won or lost
    if (guessesLeft >= 0 && lettersRemain === 0) {
        gameVictory();
    } else if (guessesLeft === 0 && lettersRemain > 0) {
        gameLost();
    }
}

function gameVictory() {
    gameStarted = false; //if the game is stopped they cant add anymore input
    emptyWordVisible.classList.add("green"); //color the correct word green
    winCounter++;
    document.getElementById("won").textContent = "Won: " + winCounter;
    guessedLettersVisible.textContent = "You have guessed correctly!";
    guessedLetters = [];
    document.getElementById("victoryTune").play(); //plays victory music
}

function gameLost() {
    gameStarted = false;
    emptyWordVisible.classList.add("red"); //show the answer and color it red to show their failure
    emptyWordVisible.textContent = theWord;
    loseCounter++;
    document.getElementById("lost").textContent = "Lost: " + loseCounter;
    guessedLettersVisible.textContent = "You have guessed incorrectly: " + guessedLetters;
    guessedLetters = [];
    document.getElementById("lossTune").play(); //plays lose music
}

window.onload = function () {
    resetGame();
};

function buttonFunction() {
    resetGame();
}
document.onkeyup = function (event) {
    guess = event.key.toLowerCase();
    if (gameStarted) {
        if (event.keyCode >= 65 && event.keyCode <= 90) // can only type a-z
        {
            if (letters.indexOf(guess) > -1) // check if guess is in the answer
            {
                if (correctLetters.indexOf(guess) === -1) //check if the guess is already guessed
                {
                    correctLetters.push(guess); //add the guessed correct letter to an invisible correct letters array so it cant be picked again
                    for (var i = 0; i < theWord.length; i++) {
                        if (letters[i] === guess) // if the guess is in this spot
                        {
                            onScreen[i] = guess; //put that there on the array that will go in the screen and reduce the progress to win by 1
                            lettersRemain--;
                            //console.log("lettersRemain="+lettersRemain);
                        }
                        currentGuess = currentGuess + onScreen[i] + " "; //add the correct answer to the screen with a space
                        emptyWordVisible.textContent = currentGuess; // show it in the html
                    }
                    currentGuess = ""; // reset the letter to be added
                }
            } else //if its not in the word
            {
                if (guessedLetters.indexOf(guess) < 0) // if it hasnt been guessed before 
                {
                    guessedLetters.push(guess); //add that guess to the array of your (wrong) guesses
                    guessedLettersVisible.textContent = "You have guessed: " + guessedLetters; //show what youve guessed (wrongly) and take away a guess
                    guessesLeft--;
                    //console.log("guessesLeft="+guessesLeft);
                    guessesLeftVisible.textContent = guessesLeft + " guesses left!"; //tell you how many guesses you have left
                }
            }
            gameStatus();
        } else {
            alert("Please enter a letter");
        }
    }
};