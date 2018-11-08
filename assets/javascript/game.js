/**
 * Hangman game
 * By: Garret Rueckert
 *
 * U of U Bootcamp HW 3
 */

//create array of different body parts to be shown
imgParts = [
  "assets/images/hung.png",
  "assets/images/leftleghung.png",
  "assets/images/rightleghung.png",
  "assets/images/leftarmhung.png",
  "assets/images/rightarmhung.png",
  "assets/images/bodyhung.png",
  "assets/images/headhung.png",
  "assets/images/nonehung.png"
];

//number of guesses a user gets in a round
var guessCount = 7;
var answerArray = [];

//set wins and losses to 0 at first, boolean for restarting game when over
var wins = 0;
var losses = 0;
var gameOver = false;

//the different answers a player can randomly get
var words = [
  "cowboy",
  "horseshoe",
  "outlaw",
  "bronco",
  "buckaroo",
  "gaucho",
  "cowgirl",
  "cowpoke",
  "wrangler",
  "bandit",
  "western",
  "shootout"
];

//just format a string to uppercase first letter
function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//math random is random between 0 and 1, floor rounds down, times length of array
var word = words[Math.floor(Math.random() * words.length)];

//answerArray is to be upadated and displayed as the player guesses correct letters
for (var i = 0; i < word.length; i++) {
  answerArray[i] = "_";
}
var remainingLetters = word.length;

//The letters a user has already guessed
var guessedLetters = [];

//function to search array for an existing element
function checkArray(el, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == el) return true;
  }
  return false;
}

document.onkeyup = function(event) {
  // Determines which key was pressed.
  var userGuess = event.key;

  var Game = {
    playerGuess: function() {
      if (checkArray(userGuess, guessedLetters)) {
        alert("You have already guessed " + userGuess + ".");
        return false;
      } else {
        guessedLetters.push(userGuess);
        for(var i=0; i < guessedLetters.length; i++){
            document.getElementById("ltrsGuessed").innerHTML =
            "<p>" + guessedLetters + " </p>";
        }
      }
      if (remainingLetters > 0 && guessCount !== 0) {

        var miss = true;
        for (var j = 0; j < word.length; j++) {
          if (word[j] === userGuess) {
            answerArray[j] = userGuess;
            remainingLetters--;
            miss = false;
            document.getElementById("answer").innerHTML =
              "<p>" + answerArray + "</p>";
            if (remainingLetters === 0) {
              alert("You win! " + upperFirstLetter(word) + " was the answer!");
              wins++;
            }
          }
        }

        if (miss) {
          guessCount--;
          document.getElementById("hangImage").src = imgParts[guessCount];
          if (guessCount == 0) {
            alert("Oh no, you are hung!");
          }
        }
      }
    }
  };
  Game.playerGuess();
};

