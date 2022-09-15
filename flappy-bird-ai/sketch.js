this.focus();

let restartTimeout;
let birdOffset = 30;
let birdWidth = 30;
let birdHeight = 30;
let pipeWidth = 60;
let pipeSpace = 120;
let pipeSpeed = 4;
let pipeFramesequence = 80;
let bestScore = 0;

function setup() {
    createCanvas(600, 400);
    bird = new Bird();
    pipes = [];
    pipes.push(new Pipe());
    noLoop();

    let divElement = createDiv();
    spanFramerate = createSpan();
    spanSpeed = createSpan();
    spanScore = createSpan();
    spanBestscore = createSpan();
    divElement.child(spanFramerate).child(spanSpeed).child(spanScore).child(spanBestscore);
    divElement.id("infos");
    divElement.style("display", "flex");
    divElement.style("flex-direction", "row");
    divElement.style("justify-content", "space-between");
    divElement.style("width", width + "px");
}

function draw() {
    background(255);
    if (frameCount % pipeFramesequence == 0) {
        pipes.push(new Pipe());
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        let pipe = pipes[i];
        pipe.update();
        if (!pipe.scored && bird.passed(pipe)) {
            bird.reward();
            pipe.scored = true;
        }
        if (pipe.disappeared()) {
            pipes.splice(i, 1);
        }
    }
    bird.update();

    for (let pipe of pipes) {
        pipe.show();
    }
    bird.show();

    if (bird.score > bestScore) {
        bestScore = bird.score;
    }

    if (bird.hit()) {
        lose();
    }
    // newSpeed = 3 + Math.floor(bird.score / 5);
    // if (newSpeed != pipeSpeed) {
    //     pipeSpeed = newSpeed;
    //     pipeFramesequence = Math.floor(pipeFramesequence * 0.9);
    // }
    showInfos();
}

function restart() {
    clearTimeout(restartTimeout);
    pipes = [];
    bird = new Bird();
    pipeFramesequence = 80;
    pipeSpeed = 3;
    draw();
}

function lose() {
    background(200, 125);
    fill(0);
    textSize(60);
    textAlign(CENTER, CENTER);
    text("YOU LOSE !", width / 2, height / 2);
    noLoop();
    restartTimeout = setTimeout(restart, 2000);
}

function keyPressed() {
    if (key == " ") {
        bird.jump();
    } else if (key == "p") {
        isLooping() ? noLoop() : loop();
    } else if (key == "r") {
        restart();
    }
}

function showInfos() {
    spanFramerate.html("FrameSpawn : " + pipeFramesequence);
    spanSpeed.html("Speed : " + pipeSpeed);
    spanScore.html("Score : " + "<b>" + bird.score + "</b>");
    spanBestscore.html("Best score : " + "<b>" + bestScore + "</b>");
}
