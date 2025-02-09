"use strict";

const scoreCount = document.querySelector(".counter");
const newGameBtn = document.querySelector(".new-game-btn");
const colorBox = document.querySelector(".color-box");
const gameStatus = document.querySelector(".game-status");
const colorOptions = document.querySelectorAll(".color-option");
const correctSound = new Audio("assets/correct-sound.mp3");
const incorrectSound = new Audio("assets/incorrect-sound.mp3");

const colorArray = [
  "#780000",
  "#6a0dad",
  "#283618",
  "#bc6c25",
  "#ffafcc",
  "#003366",
];
// const colorArray = [
//   "#003366",
//   "#ffa500",
//   "#669bbc",
//   "#d32f2f",
//   "#ffd700",
//   "#cdb4db",
// ];

// =====================================================
// Function to generate random color
const generateRandomColor = function () {
  // Generate a random number between 0 - 5
  const randomNum = Math.floor(Math.random() * colorArray.length);
  // Use random number as index to get a color from array
  console.log(randomNum, colorArray[randomNum]);
  return colorArray[randomNum];
};

const shuffleColorArray = function (colorArray) {
  for (let i = colorArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [colorArray[i], colorArray[j]] = [colorArray[j], colorArray[i]];
  }
  return colorArray;
};
const copyColorArray = [...colorArray];
const shuffledColor = shuffleColorArray(copyColorArray);
console.log(shuffledColor);

colorOptions.forEach((option) => {
  option.addEventListener("click", () => {});
  shuffleColorArray(copyColorArray);
  // button.style.backgroundColor = shuffledColor[index];
});

// loop color options and set background color
for (let i = 0; i < colorOptions.length; i++) {
  colorOptions[i].style.backgroundColor = shuffledColor[i];
}

// toggle the game status
const toggleGameStatus = () => gameStatus.classList.toggle("hidden");

const showMessage = (text, color) => {
  gameStatus.textContent = text;
  gameStatus.style.color = color;
  // gameStatus.style.borderColor = color;
};

// Creates undefined variable in the global scope
let randomColor;

const generateGame = function () {
  // Generate color once per game
  randomColor = generateRandomColor();
  console.log(randomColor);
  // Displays random color in the color box
  colorBox.style.backgroundColor = randomColor;
  // Loops through option button
  colorOptions.forEach(function (option, index) {
    // Assigns random color to option button

    // Remove old event listener by replacing the button
    // VERY IMPORTANT
    let newOption = option.cloneNode(true);
    option.replaceWith(newOption);

    // Remove game status
    // gameStatus.classList.add("hidden");

    // Sets click event on each option
    newOption.addEventListener("click", () => {
      // Extracts numbers from rgb(a) and convert to array
      const pickedColor = newOption.style.backgroundColor.match(/\d+/g);
      // Convert to array of Numbers
      const arrRGB = pickedColor.map(Number);
      // console.log(arrRGB);

      const hexArr = [];
      for (let i = 0; i < arrRGB.length; i++) {
        // Convert to hex string and pad with 0 if string is < 2
        const convertHexString = arrRGB[i].toString(16).padStart(2, "0");
        // Create array of hex in string
        hexArr.push(convertHexString);
      }
      // console.log(hexArr);

      // Create hex color from hex array
      const pickedHexColor = `#${hexArr.join("")}`;
      console.log(
        `Button clicked ${newOption.style.backgroundColor} ------- Hex color ${pickedHexColor}`
      );

      // console.log(pickedHexColor);

      if (pickedHexColor === randomColor) {
        // console.log(
        //   `Correct! You are a genius 🎉 Picked Color: ${pickedHexColor} --- Generated Color ${randomColor}`
        // );
        scoreCount.textContent++;
        gameStatus.classList.remove("hidden");
        showMessage("Correct! You are a genius 🎉", "green");
        correctSound.play();
        setTimeout(toggleGameStatus, 1000);
        setTimeout(generateGame, 1000);
      } else {
        console.log(
          `Wrong! 😞 Try again Picked Color: ${pickedHexColor} --- Generated Color ${randomColor}`
        );
        gameStatus.classList.remove("hidden");
        showMessage("Wrong! 😞 Try again", "red");
        incorrectSound.play();
        setTimeout(toggleGameStatus, 1000);
      }
    });
  });
};
// call game generate game functionalities
generateGame();

// Initialize game: Reset score and generate game
const restartGame = () => {
  newGameBtn.addEventListener("click", () => {
    scoreCount.innerHTML = "0";
    generateGame();
  });
};
// call restart game to restore factory
restartGame();
