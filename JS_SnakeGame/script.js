// canvas
const canvas = document.getElementById("canvas");

// context 2d
const context = canvas.getContext("2d");

// the size of the cells on the playing field
const grid = 16;
var count = 0;
var score = 0;
var max = 0;

// object snake
const snake = {
  x: 160,
  y: 160,

  dx: 0,
  dy: grid,

  maxCells: 2,

  cells: [],
};

// object food
const food = {
  x: 320,
  y: 320,
};

// random
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// main game cycle
function loop() {
    requestAnimationFrame(loop)

  if (++count < 4) {  // 60fps / 15fps = 4fps
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {    // gorizontal
    snake.x = canvas.clientWidth - grid;
  } else if (snake.x >= canvas.clientWidth) {
    snake.x = 0;
  }

  if (snake.y < 0) {    // vertical
    snake.y = canvas.clientHeight - grid;
  } else if (snake.y >= canvas.clientHeight) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // eat color
  context.fillStyle = "pink";
  context.fillRect(food.x, food.y, grid - 1, grid - 1);

  // snake color
  context.fillStyle = "yellow";

  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1)
    if (cell.x === food.x && cell.y === food.y) {
      // snake width
      snake.maxCells++;

      // score
      score += 1;
      document.getElementById("score").innerHTML = score;

      // food
      food.x = getRandomInt(0, 25) * grid;
      food.y = getRandomInt(0, 25) * grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        if(score > max) {
            max = score
        }
        snake.x = 160, 
        snake.y = 160,
        snake.cells = [];
        snake.maxCells = 2;
        snake.dx = 0;
        snake.dy = grid;
        score = 0;
        // food
        food.x = getRandomInt(0, 35) * grid;
        food.y = getRandomInt(0, 35) * grid;
        document.getElementById('score').innerHTML = max
      }
    }
  });
}

document.addEventListener('keydown', (e) => {
    if(e.keyCode === 37 && snake.dx === 0) { // left key
        snake.dx = -grid
        snake.dy = 0
    } else if(e.keyCode === 38 && snake.dy === 0) { // up key
        snake.dy = -grid
        snake.dx = 0
    } else if(e.keyCode === 39 && snake.dx === 0) { // right key
        snake.dx = grid
        snake.dy = 0
    } else if(e.keyCode === 40 && snake.dy === 0) { // down key
        snake.dy = grid
        snake.dx = 0
    }
})

requestAnimationFrame(loop)
