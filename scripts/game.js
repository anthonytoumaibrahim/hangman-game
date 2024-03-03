const hangContainer = document.getElementById("hang");
const answerSection = document.getElementById("answer-section");
const lettersContainer = document.querySelector(".letters");

// https://www.hangmanwords.com/words
const words = [
  "abruptly",
  "bandwagon",
  "boggle",
  "equip",
  "galaxy",
  "lengths",
  "pixel",
  "quizzes",
  "strength",
  "unknown",
];
const maxAmountOfAttempts = 6;

let randomWord = "";
let randomWordLength = 0;
let attempts = 0;
let solvedLetters = [];

function pickRandomWord() {
  answerSection.innerHTML = "";
  randomWord = words[Math.floor(Math.random() * words.length)];
  randomWordLength = randomWord.length;
  attempts = 0;
  solvedLetters = [];
  // Add letter placeholders
  for (let i = 0; i < randomWordLength; i++) {
    answerSection.innerHTML += `<span>_</span>`;
  }
  hangContainer.innerHTML = `<img src="./assets/hang.svg" class="stand" />`;
}

pickRandomWord();

function guessLetter(letter = "") {
  let wrongGuess = randomWord.indexOf(letter) === -1;
  // Restart if max amount of guesses or if already solved
  if (
    attempts === maxAmountOfAttempts ||
    solvedLetters.length === randomWordLength
  ) {
    pickRandomWord();
    return;
  }
  // Wrong guess
  if (wrongGuess) {
    attempts += 1;
    switch (attempts) {
      case 1:
        head();
        break;
      case 2:
        body();
        break;
      case 3:
        leftHand();
        break;
      case 4:
        rightHand();
        break;
      case 5:
        leftLeg();
        break;
      case 6:
        rightLeg();
        alert(`Sorry, you lost! The word was: ${randomWord}.`);
        break;
    }
    return;
  }
  // Letter already solved
  if (solvedLetters.includes(letter)) {
    return;
  }
  // Correct guess
  for (let i = 0; i < randomWordLength; i++) {
    if (randomWord[i] === letter) {
      answerSection.children[i].innerHTML = letter;
      solvedLetters.push(letter);
    }
  }
  // Solved the whole word
  if (solvedLetters.length === randomWordLength) {
    alert("Congrats! You got it right.");
  }
}

// Detect letters press
lettersContainer.childNodes.forEach((elem) => {
  elem.addEventListener("click", () => {
    const letter = elem.innerText.toLowerCase();
    guessLetter(letter);
  });
});
// Detect key press on keyboard
document.addEventListener("keydown", (evt) => {
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const pressedKey = evt.key.toLowerCase();
  if (!letters.includes(pressedKey)) {
    return;
  }
  guessLetter(pressedKey);
});
