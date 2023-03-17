// Set up the game board
const gameBoard = document.getElementById("game-board");
const gameBoardWidth = 600;
const gameBoardHeight = 600;
gameBoard.style.width = `${gameBoardWidth}px`;
gameBoard.style.height = `${gameBoardHeight}px`;

// Set up the initial state of the game
let snake = [
  {x: 10, y: 10},
  {x: 10, y: 11},
  {x: 10, y: 12},
];
let direction = "right";
let food = {x: 5, y: 5};
let score = 0;
let gameIntervalId;
let gameOver = false;

// Draw the initial state of the game
draw();

// Set up the game loop
gameIntervalId = setInterval(() => {
  if (!gameOver) {
    move();
    draw();
  }
}, 100);

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

// Handle play again button click
document.getElementById("play-again").addEventListener("click", () => {
  resetGame();
});

function move() {
  const head = {...snake[0]};
  if (direction === "up") {
    head.y--;
    if (head.y < 0) {
      gameOver = true;
    }
  } else if (direction === "down") {
    head.y++;
    if (head.y >= gameBoardHeight / 20) {
      gameOver = true;
    }
  } else if (direction === "left") {
    head.x--;
    if (head.x < 0) {
      gameOver = true;
    }
  } else if (direction === "right") {
    head.x++;
    if (head.x >= gameBoardWidth / 20) {
      gameOver = true;
    }
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {x: Math.floor(Math.random() * gameBoardWidth / 20), y: Math.floor(Math.random() * gameBoardHeight / 20)};
  } else {
    snake.pop();
  }
  checkGameOver();
}

function draw() {
  gameBoard.innerHTML = "";
  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");
    snakeElement.style.left = `${segment.x * 20}px`;
    snakeElement.style.top = `${segment.y * 20}px`;
    gameBoard.appendChild(snakeElement);
  });
  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.left = `${food.x * 20}px`;
  foodElement.style.top = `${food.y * 20}px`;
  gameBoard.appendChild(foodElement);
  document.getElementById("score").innerText = score;
}

function checkGameOver() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver = true;
      break;
    }
  }
  if (gameOver) {
    clearInterval(gameIntervalId);
    document.getElementById("game-over").style.display = "block";
  }
}

function resetGame() {
  snake = [
    {x: 10, y: 10},
    {x: 10, y: 11},
    {x: 10, y: 12},
  ];
  direction = "right";
  food = {x: 5, y: 5};
  score = 0;
  gameOver = false;
  document.getElementById("game-over").style.display = "none";
  gameIntervalId = setInterval(() => {
    if (!gameOver) {
      move();
      draw();
    }
  }, 100);
}
