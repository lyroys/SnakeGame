let audioPlay = 1;

$(document).ready(function() {
  $("#audioButton").click(function() {
    if (audioPlay == 1) {
      $('#audioButton').addClass('play');
      music.pause();
      audioPlay = 0;
    } else {
      $('#audioButton').removeClass('play');
      music.play();
      audioPlay = 1;
    }

  });
});

music = new Audio('audio/music.mp3');
music.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);
music.play();


const canv = document.getElementById("snake");
const cont = canv.getContext("2d");


const box = 16;


const ground = new Image();
ground.src = "img/groundv2.png";


let snake = [];
snake[0] = {
  x: 18 * box,
  y: 20 * box
};


let food = {
  x: Math.floor(Math.random() * 33 + 2) * box,
  y: Math.floor(Math.random() * 25 + 6) * box
}

let score = 0;

let d;

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}



let move = 0;
let drawCount = 0;

function draw() {

  move = 0;


  cont.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    cont.fillStyle = (i == 0) ? "black" : "white";
    cont.fillRect(snake[i].x, snake[i].y, box, box);

    cont.strokeStyle = "white";
    cont.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  cont.fillStyle = "red";
  cont.fillRect(food.x, food.y, box, box);



  document.addEventListener("keydown", direction);

  function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT" && move != 1) {
      move = 1;

      d = "LEFT";
      $('#start').addClass('hide');
    } else if (key == 38 && d != "DOWN" && move != 1) {
      move = 1;
      d = "UP";

      $('#start').addClass('hide');
    } else if (key == 39 && d != "LEFT" && move != 1) {
      move = 1;
      d = "RIGHT";

      $('#start').addClass('hide');
    } else if (key == 40 && d != "UP" && move != 1) {
      move = 1;
      d = "DOWN";

      $('#start').addClass('hide');
    }

  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;


  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;


  if (snakeX == food.x && snakeY == food.y) {
    score++;

    food = {
      x: Math.floor(Math.random() * 33 + 2) * box,
      y: Math.floor(Math.random() * 25 + 6) * box
    }

  } else {

    snake.pop();
  }



  let newHead = {
    x: snakeX,
    y: snakeY
  }


  if (snakeX < 2 * box || snakeX > 35 * box || snakeY < 6 * box || snakeY > 35 * box || collision(newHead, snake)) {
    $('#start').removeClass('hide');
    d = "nothing";
    score = 0;
    snake = [];
    snake[0] = {
      x: 18 * box,
      y: 20 * box
    };

    snakeX = snake[0].x;
    snakeY = snake[0].y;

    newHead = {
      x: snakeX,
      y: snakeY
    }
    snake.pop();


    food = {
      x: Math.floor(Math.random() * 33 + 2) * box,
      y: Math.floor(Math.random() * 25 + 6) * box
    }

  }

  snake.unshift(newHead);



  cont.fillStyle = "red";
  cont.fillRect(1.5 * box, 1.2 * box, 2 * box, 2 * box);

  cont.fillStyle = "white";
  cont.font = "45px Changa one";
  cont.fillText(score, 4 * box, 3.2 * box);

  // cont.fillStyle = "white";
  // cont.font = "45px Changa one";
  // cont.fillText(snake.length, 30 * box, 3.2 * box);

  drawCount++;

}

let game = setInterval(draw, 80);
