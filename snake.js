const box = document.getElementById("box");
const scr=document.getElementById("score");
const hscr=document.getElementById("highScore");
const w = box.width;
const h = box.height;
const t = 22;
let snake = [{ x: 12, y: 12 }];
const pointer = box.getContext("2d");
let speed = { x: 0, y: 0 };
let food = {};
let inter = 100;
let score=0;
let highScore=0;
function drawBoard() {

    for (let i = 0; i < h / t; i++) {
        for (let j = 0; j < w / t; j++) {
            pointer.fillStyle = (i + j) % 2 == 0 ? "white" : "#49f374";

            pointer.fillRect(j * t, i * t, t, t);

        }

    }


}


function drawSnake() {
    snake.forEach(e => {
        pointer.fillStyle = "green";

        pointer.fillRect(e.x * t, e.y * t, t, t);
    });

}


function foodPos() {
    let drawn = false;
    let x1, y1;
    while (!drawn) {
        x1 = (Math.floor(Math.random() * (w / t)));
        y1 = (Math.floor(Math.random() * (h / t)));

        drawn = true;
        for (let i = 0; i < snake.length; i++) {
            if (x1 === snake[i].x && y1 === snake[i].y) {
                drawn = false;
                break;
            }
        }
    }

    food = { x: x1, y: y1 };

}
function drawFood() {

    pointer.fillStyle = "tomato";
    pointer.fillRect(food.x * t, food.y * t, t, t);
}

function eat() {
    return (snake[0].x === food.x && snake[0].y === food.y);
}


function updateSnakePos() {

    let head = {
        x: snake[0].x + speed.x,
        y: snake[0].y + speed.y
    };
    snake.unshift(head);
    if (eat()) {
        score++;
        scr.style.color="white";
        scr.textContent=score;
        foodPos();
    }
    else {
        snake.pop();
    }


}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= w / t || head.y < 0 || head.y >= h / t) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    snake = [{ x: 12, y: 12 }];
    speed = { x: 0, y: 0 };
    foodPos();
    score=0;
    scr.textContent=score;
    scr.style.color="red";
    
}
function checkHighScore(){
    if(highScore<score){
        highScore=score;
        hscr.textContent=highScore;
        scr.style.color="#49f374";
    }
}
function run() {
    pointer.clearRect(0, 0, box.width, box.height);
    drawBoard();
    drawSnake();
    drawFood();
    updateSnakePos();
    checkCollision();
    checkHighScore();
};
foodPos();
let gameInterval;
gameInterval = setInterval(run, 90);

function handleSpeed(speed) {
    clearInterval(gameInterval);
    gameInterval = setInterval(run, speed);
}

document.addEventListener("keydown", (e) => {

    switch (e.key) {

        case "ArrowUp":
            e.preventDefault();
            if (speed.y === 0) speed = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            e.preventDefault();
            if (speed.y === 0) speed = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            e.preventDefault();
            if (speed.x === 0) speed = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            e.preventDefault();
            if (speed.x === 0) speed = { x: 1, y: 0 };
            break;
        
    }
});
let sv = false;
const s = document.getElementById("drop");
const speedO = document.getElementById("v");
s.addEventListener("click", () => {

    speedO.classList.toggle("hid");

})


document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById("full");


    
    function goFullscreen() {
        if (app.requestFullscreen) {
            app.requestFullscreen();

        } else if (app.mozRequestFullScreen) { // Firefox
            app.mozRequestFullScreen();
        } else if (app.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            app.webkitRequestFullscreen();
        } else if (app.msRequestFullscreen) { // IE/Edge
            app.msRequestFullscreen();
        }

    }
    function handleFullScreenChange() {
        if (!document.fullscreenElement) {
            app.classList.toggle("full");
        } else {
            app.classList.toggle("full");
        }
    }

    // Event listener for full-screen change
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange); // Firefox
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange); // Chrome, Safari, Opera
    document.addEventListener('msfullscreenchange', handleFullScreenChange);


    const button = document.getElementById('fullscr');
    
    button.onclick = goFullscreen;
    

});

const low = document.getElementById("low");
low.addEventListener("click", () => {
    speedO.classList.toggle("hid");
    handleSpeed(180);
});
const mid = document.getElementById("mid");
mid.addEventListener("click", () => {
    speedO.classList.toggle("hid");
    handleSpeed(90);
});
const high = document.getElementById("high");
high.addEventListener("click", () => {
    speedO.classList.toggle("hid");
    handleSpeed(50);
});


