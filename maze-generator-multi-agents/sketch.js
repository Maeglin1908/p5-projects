let creators = new Array();
let creatorsTmp = new Array();

function setup() {
    let offset = 30;
    let globalW = windowWidth - offset * 2;
    let globalH = windowHeight - offset * 2;

    createCanvas(globalW, globalH).position(offset, offset);
    frameRate = 10;
    maze = new Maze(width, height, 15);
    let startCell = maze.getCellAt(0, 0);
    startCell.visited = true;
    let endCell = maze.getCellAt(maze.nbCols - 1, maze.nbRows - 1);
    creator = new Creator(maze, startCell, endCell);
    creators.push(creator);
    creatorsTmp = creators.slice();

    while (!maze.isFullyCreated()) {
        for (let i = 0; i < creators.length; i++) {
            creators[i].step();
        }
        creators = creatorsTmp.slice();
    }
    creator = new Creator(maze, startCell, endCell);
}

function draw() {
    background(0);
    maze.show();
    creator.show();
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
    } else if (key == " ") {
        draw();
    }

    creator.move(dirX, dirY);
}
