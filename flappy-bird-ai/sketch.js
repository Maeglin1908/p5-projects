this.focus();

// Base
let restartTimeout;
let birdOffset = 30;
let birdWidth = 30;
let birdHeight = 30;
let pipeWidth = 60;
let pipeSpace = 120;
let pipeSpeedBase = 3;
let pipeFramesequenceBase = 80;
let pipeSpeed = pipeSpeedBase;
let pipeFramesequence = pipeFramesequenceBase;
let frameCounter = 0;

// AI Part
let maxCycles = 500;
let population = 500;
let bestScoreTraining = 0;
let bestScorePractice = 0;
let training = true;
let birds = [];
let diedBirds = [];
let bestBrain;
let pipes = [];
let generationCount = 0;

function preload() {
    divGeneralElement = createDiv().id("infos");
    spanFramerate = createSpan();
    spanSpeed = createSpan();

    divGeneralElement.child(spanFramerate).child(spanSpeed);

    divCountersElement = createDiv().id("counters");

    divScoresElement = createDiv().class("scores");
    spanScoreTraining = createSpan();
    spanScorePractice = createSpan();
    divScoresElement.child(spanScoreTraining).child(spanScorePractice);

    divBestScoresElement = createDiv().class("scores");
    spanBestscoreTraining = createSpan();
    spanBestscorePractice = createSpan();
    divBestScoresElement.child(spanBestscoreTraining).child(spanBestscorePractice);

    spanGenerationCount = createSpan();
    divCountersElement.child(spanGenerationCount).child(divScoresElement).child(divBestScoresElement);

    divAiElement = createDiv().id("ai");
    sliderCycles = createSlider(1, maxCycles, 1);
    spanCycles = createSpan();
    buttonToggleTrain = createButton("Toggle train");
    buttonToggleTrain.mousePressed(toggleTraining);
    divAiElement.child(sliderCycles).child(spanCycles).child(buttonToggleTrain);
}

function showInfos() {
    let currentBestScore = 0;
    for (let bird of birds) {
        if (bird.score > currentBestScore) {
            currentBestScore = bird.score;
        }
    }
    spanFramerate.html("Framespawn : " + pipeFramesequence);
    spanSpeed.html("Speed : " + pipeSpeed);
    if (training) {
        spanScoreTraining.html("Current training score : " + "<b>" + currentBestScore + "</b>");
        spanBestscoreTraining.html("Best training score : " + "<b>" + bestScoreTraining + "</b>");
    } else {
        spanScorePractice.html("Current score : " + "<b>" + currentBestScore + "</b>");
        spanBestscorePractice.html("Best score : " + "<b>" + bestScorePractice + "</b>");
    }
    spanGenerationCount.html("Generation # " + generationCount);
    spanCycles.html(sliderCycles.value() + " cycles");
    if (training) {
        buttonToggleTrain.html("Toggle train (Enabled");
    } else {
        buttonToggleTrain.html("Toggle train (Disabled");
    }
}

function setup() {
    createCanvas(600, 400);
    frameRate(60);
    startNewGame();

    if (training) {
        sliderCycles.value(maxCycles);
    } else {
        sliderCycles.value(1);
        noLoop();
    }

    // generateUi();
}

function draw() {
    background(255);
    let cycles = sliderCycles.value();
    for (let n = 0; n < cycles; n++) {
        for (let pipe of pipes) {
            pipe.update();
        }
        for (let bird of birds) {
            bird.update();
        }

        for (let i = pipes.length - 1; i >= 0; i--) {
            if (pipes[i].disappeared()) {
                pipes.splice(i, 1);
            }
        }

        // if (training) {
        for (let i = birds.length - 1; i >= 0; i--) {
            let bird = birds[i];
            bird.think();

            if (bird.hit()) {
                diedBirds.push(birds.splice(i, 1)[0]);
            } else {
                if (training) {
                    bird.reward();
                } else {
                    for (let pipe of pipes) {
                        if (!pipe.scored && bird.passed(pipe)) {
                            bird.reward();
                            pipe.scored = true;
                            break;
                        }
                    }
                }
                if (training) {
                    if (bird.score > bestScoreTraining) {
                        bestScoreTraining = bird.score;
                    }
                } else {
                    if (bird.score > bestScorePractice) {
                        bestScorePractice = bird.score;
                    }
                }
            }
        }
        if (birds.length == 0) {
            startNewGame();
        }

        frameCounter++;
        if (frameCounter % pipeFramesequence == 0) {
            pipes.push(new Pipe());
        }
    }

    for (let pipe of pipes) {
        pipe.show();
    }
    for (let bird of birds) {
        bird.show();
    }

    showInfos();
    if (training && bestScoreTraining > 10000000) {
        toggleTraining();
    }
}

function toggleTraining() {
    training = !training;
    // sliderCycles.value(1);
    startNewGame();
}

function startNewGame() {
    clearTimeout(restartTimeout);

    if (training) {
        birds = generatePopulation(diedBirds, population);
    } else {
        let bestBrain;
        if (birds.length > 0) {
            bestBrain = birds[birds.length - 1].brain;
        } else if (diedBirds.length > 0) {
            bestBrain = diedBirds[0].brain;
        }
        birds = [new Bird()];
        birds[0].brain = bestBrain;
        console.log(bestBrain);
    }
    diedBirds = [];
    pipes = [new Pipe()];
    pipeFramesequence = pipeFramesequenceBase;
    pipeSpeed = pipeSpeedBase;
    frameCounter = 0;
}

function lose() {
    if (!training) {
        background(200, 125);
        fill(0);
        textSize(60);
        textAlign(CENTER, CENTER);
        text("YOU LOSE !", width / 2, height / 2);
        noLoop();
        restartTimeout = setTimeout(restart, 2000);
    } else {
    }
}

function keyPressed() {
    if (!training && key == " ") {
        // bird.jump();
    } else if (key == "p") {
        isLooping() ? noLoop() : loop();
    } else if (key == "r") {
        startNewGame();
    }
}

function generatePopulation(previousPopulation, population) {
    let sumScores = 0;

    for (let bird of previousPopulation) {
        sumScores += bird.score;
    }
    for (let bird of previousPopulation) {
        bird.fitness = bird.score / sumScores;
    }
    previousPopulation.sort((a, b) => (a.fitness > b.fitness ? -1 : b.fitness > a.fitness ? 1 : 0));

    let newGeneration = [];
    for (let i = 0; i < population; i++) {
        let randomBird = previousPopulation[Math.floor(random(0, previousPopulation.length / 10))];

        if (randomBird) {
            newGeneration.push(new Bird(randomBird.brain));
        } else {
            newGeneration.push(new Bird());
        }
    }

    generationCount++;

    return newGeneration;
}
