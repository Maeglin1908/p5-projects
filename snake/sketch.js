this.focus();
let frameBase = 5;
let snake;
let resolution = 20;
let w = 20;
let h = 20;
let food;
let spanFramerate;
let spanScore;
let spanBestscore;
let score = 0;
let bestScore = 0;
let restartTimeout;
function setup() {
    createCanvas(w * resolution, h * resolution);
    frameRate(frameBase);
    snake = new Snake();
    textAlign(CENTER, CENTER);
    generateFood();

    let divElement = createDiv();
    spanFramerate = createSpan();
    spanScore = createSpan();
    spanBestscore = createSpan();
    divElement.child(spanFramerate).child(spanScore).child(spanBestscore);
    divElement.id("infos");
    divElement.style("display", "flex");
    divElement.style("flex-direction", "row");
    divElement.style("justify-content", "space-between");
    divElement.style("width", width + "px");
}

function draw() {
    scale(resolution);
    background(0);

    snake.update();
    if (snake.lose()) {
        lose();
    } else if (snake.eat(food)) {
        snake.growUp();
        frameRate(frameBase + Math.floor(snake.score() / 5) * 2);
        if (snake.win()) {
            win();
        } else {
            generateFood();
        }
    }

    snake.show();
    food.show();

    if (snake.score() > bestScore) {
        bestScore = snake.score();
    }

    showInfos();
}

function generateFood() {
    while (true) {
        food = new Food();
        if (!food.onSnake(snake)) break;
    }
}

function restart() {
    clearTimeout(restartTimeout);
    snake = new Snake();
    frameRate(5);
    generateFood();
    loop();
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        snake.setDir(0, -1);
    } else if (keyCode == DOWN_ARROW) {
        snake.setDir(0, 1);
    } else if (keyCode == LEFT_ARROW) {
        snake.setDir(-1, 0);
    } else if (keyCode == RIGHT_ARROW) {
        snake.setDir(1, 0);
    } else if (key == "r") {
        restart();
    } else if (key == " ") {
        isLooping() ? noLoop() : loop();
    }
}

function showInfos() {
    spanFramerate.html("Framerate : " + Math.floor(frameRate()));
    spanScore.html("Score : " + "<b>" + snake.score() + "</b>");
    spanBestscore.html("Best score : " + "<b>" + bestScore + "</b>");
}

function lose() {
    background(125, 125);
    fill(200, 0, 0);
    textSize(3);
    text("YOU LOSE !", w / 2, h / 2);
    noLoop();
    restartTimeout = setTimeout(restart, 2000);
}

function win() {
    background(125, 125);
    fill(0, 200, 0);
    textSize(20);
    text("YOU WIN !", 0, 0);
    noLoop();
}
