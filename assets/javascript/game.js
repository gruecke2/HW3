/**
 * Hangman game
 * By: Garret Rueckert
 *
 * U of U Bootcamp HW 3
 */

//create array of different body parts to be shown
var imgParts = [
  "assets/images/hung.png",
  "assets/images/leftleghung.png",
  "assets/images/rightleghung.png",
  "assets/images/leftarmhung.png",
  "assets/images/rightarmhung.png",
  "assets/images/bodyhung.png",
  "assets/images/headhung.png",
  "assets/images/nonehung.png"
];

//set wins and losses to 0 at first
var wins = 0;
var losses = 0;

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

// boolean for restarting game when over
var gameOver = false;

//number of guesses a user gets in a round
var guessCount = 7;
var answerArray = [];

//math random is random between 0 and 1, floor rounds down, times length of array
var word = words[Math.floor(Math.random() * words.length)];

//answerArray is to be upadated and displayed as the player guesses correct letters
for (var i = 0; i < word.length; i++) {
  answerArray[i] = "_";
}
var remainingLetters = word.length;

//The letters a user has already guessed
var guessedLetters = [];

document.getElementById("answer").textContent = answerArray.join("  ");

function resetGame() {
  // boolean for restarting game when over
  gameOver = false;

  //number of guesses a user gets in a round
  guessCount = 7;

  //empty the answer array
  answerArray = [];

  //math random is random between 0 and 1, floor rounds down, times length of array
  word = words[Math.floor(Math.random() * words.length)];

  //answerArray is to be upadated and displayed as the player guesses correct letters
  for (var i = 0; i < word.length; i++) {
    answerArray[i] = "_";
  }
  remainingLetters = word.length;

  //The letters a user has already guessed
  guessedLetters = [];

  document.getElementById("answer").textContent = answerArray.join("  ");
  document.getElementById("ltrsGuessed").textContent = "";
  document.getElementById("hangImage").src = imgParts[guessCount];
}

//format a string to uppercase first letter
function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//function to search array for an existing element
function checkArray(el, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == el) return true;
  }
  return false;
}

/**
 * Game object, only has main player guess function for now;
 * could be refactored to have some of the non global variables
 * as properties on the Game object.
 */
var Game = {
  playerGuess: function(userGuess) {
    if (checkArray(userGuess, guessedLetters)) {
      alert("You have already guessed " + userGuess + ".");
      return false;
    } else {
      guessedLetters.push(userGuess);
      for (var i = 0; i < guessedLetters.length; i++) {
        document.getElementById("ltrsGuessed").innerHTML =
          "<p>" + guessedLetters.join(" ") + " </p>";
      }
    }

    //correct guess condition
    if (remainingLetters > 0 && guessCount !== 0) {
      var miss = true;
      for (var j = 0; j < word.length; j++) {
        if (word[j] === userGuess) {
          answerArray[j] = userGuess;
          remainingLetters--;
          miss = false;
          document.getElementById("answer").innerHTML =
            "<p>" + answerArray.join(" ") + "</p>";

          //check if win or lose
          if (remainingLetters === 0) {
            alert("You win! " + upperFirstLetter(word) + " was the answer!");
            wins++;
            document.getElementById("wins").textContent = wins;
            gameOver = true;
          }
        }
      }

      //miss condition
      if (miss) {
        guessCount--;
        if (guessCount == 0) {
          alert("Oh no, you are hung!");
          losses++;
          document.getElementById("losses").textContent = losses;
          gameOver = true;
        }
        changeImage();
      }
    }
  }
};

function changeImage() {
  document.getElementById("hangImage").src = imgParts[guessCount];
}

//check if the game is over, prompt user to play again if so
function checkGameOver() {
  changeImage();
  if (gameOver) {
      var playAgain = confirm("Play again?");
    if (playAgain) {
      resetGame();
    } else {
      alert("Thanks for playing! \n Game by Garret Rueckert");
    }
  }
}

//main game loop, to be called on a (regex validated) letter guess
document.onkeyup = function(event) {
  if (/^[^a-z]*([a-z])[^a-z]*$/i.test(event.key)) {
    // Determines which key was pressed.
    var g = event.key;
    Game.playerGuess(g);
    checkGameOver();
  } else {
    checkGameOver();
  }
};
