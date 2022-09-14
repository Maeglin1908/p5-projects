let creators = new Array();

function setup() {
    offset = 30;
    globalW = windowWidth - offset * 2;
    globalH = windowHeight - offset * 2;
    createCanvas(globalW, globalH).position(offset, offset);
    frameRate = 10;
    maze = new Maze(globalW, globalH, 15);
    creator = new Creator();
    creator.setMaze(maze);
    creators.push(creator);
    // noLoop();
}

function draw() {
    // if (keyIsPressed === true) {
    background(0);
    for (let i = 0; i < creators.length; i++) {
        creators[i].step();
        creators[i].show();
    }
    maze.show();
    // }
}

function keyReleased() {
    dirX = 0;
    dirY = 0;
    if (keyCode === LEFT_ARROW) {
        dirX--;
    } else if (keyCode === RIGHT_ARROW) {
        dirX++;
    } else if (keyCode === UP_ARROW) {
        dirY--;
    } else if (keyCode === DOWN_ARROW) {
        dirY++;
    }

    for (let i = 0; i < creators.length; i++) {
        moved = creators[i].move(dirX, dirY);
    }
}
