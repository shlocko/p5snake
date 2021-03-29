
let fr, menu, gameOver, pauseControl, x, y, snake, length, apple, dir, growth, score;
fr = 8;
menu = true;
gameOver = false;
pauseControl = false;
growth = 2;
score = 0;
x = 0;
y = 0;
snake = [];
length = 1;
apple = [randomInt(0,29), randomInt(0, 19)];
dir = "right";


function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function setup(){
    createCanvas(600, 400);
    frameRate(fr);
}

const drawGame = () => {
    background(220);
    drawSnake();
    drawApple();
    fill(0);
    textSize(12);
    text(`Score: ${score.toString()}`, 10, 10);
    update();
}
const drawSnake = () => {
    fill(150);
    rect(x*20, y*20, 20);
    for(let i = 0; i < snake.length; i++){
        rect(snake[i][0]*20, snake[i][1]*20, 20);
    }
}
const drawApple = () => {
    fill(0);
    rect(apple[0]*20, apple[1]*20, 20, 20);
}
const update = () => {
    switch(dir){
        case "right":
            x+=1;
            break;
        case "left":
            x-=1;
            break;
        case "up":
            y-=1;
            break;
        case"down":
            y+=1;
            break;
    }
    checkCollision();
    snake.push([x,y]);
    if (snake.length > length) {
        snake.shift();
    }
    pauseControl = false;
    checkApple();
}

const checkApple = () => {
    if(x==apple[0] && y==apple[1]){
        length += growth;
        score++;
        apple = [randomInt(0,29), randomInt(0, 19)];
        for(let i = 0; i < snake.length; i++){
            if (snake[i][0] == apple[0] && snake[i][1] == apple[1]) apple = [randomInt(0,29), randomInt(0, 19)];
        }
    }
}

const checkCollision = () => {
    for(let i = 0; i < snake.length; i++){
        if(snake[i][0] == x && snake[i][1] == y) gameOver = true;
    }
    if(x > 29 || x < 0 || y > 19 || y < 0) gameOver = true;
}

const drawMenu = () => {
    background(220);
    textSize(40);
    fill(0);
    text("Snake", 230, 80);
    strokeWeight(0);
    if(mouseX > 200 && mouseX < 400 && mouseY > 200 && mouseY < 280){
        fill(200);
    } else {
        fill(250);
    }
    rect(200, 200, 200, 80);
    fill(0);
    text("Start", 250, 255);
}

const drawGameOver = () => {
    textSize(40);
    fill(0);
    text("Game Over!", 175, 80);
    strokeWeight(0);
    if(mouseX > 200 && mouseX < 400 && mouseY > 200 && mouseY < 280){
        fill(200);
    } else {
        fill(250);
    }
    rect(200, 200, 200, 80);
    fill(0);
    text("Menu", 250, 255);

}


function draw(){
    if(menu){
        drawMenu();
    } else if (gameOver){
        drawGameOver();
    } else {
        drawGame();
    }
}
function mousePressed() {
    if (menu) {
        if(mouseX > 200 && mouseX < 400 && mouseY > 200 && mouseY < 280){
            menu = false;
            timer = millis();
        }
    } else if (gameOver){
        if(mouseX > 200 && mouseX < 400 && mouseY > 200 && mouseY < 280){
            menu = true;
            gameOver = false;
            x = 0;
            y = 0;
            dir = "right";
            snake = [];
            length = 1;
            score = 0;
        }

    } else {

    }
}

function keyPressed() {
    if(!menu && !gameOver && !pauseControl) {
        switch(keyCode){
            case 87:
                if(dir != "down"){
                    dir = "up"
                    pauseControl = true;
                };
                break;
            case 65:
                if(dir != "right"){
                    dir = "left"
                    pauseControl = true;
                };
                break;
            case 83:
                if(dir != "up"){
                    dir = "down"
                    pauseControl = true;
                };
                break;
            case 68:
                if(dir != "left"){
                    dir = "right"
                    pauseControl = true;
                };
                break;
        }
    }
}