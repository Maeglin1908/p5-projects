grid = new Array();
draggedCells = [];
function setup() {
    offset = 30;
    cellSize = 10;
    globalW = Math.floor((windowWidth - offset * 2) / cellSize) * cellSize;
    globalH = Math.floor((windowHeight - offset * 2) / cellSize) * cellSize;
    createCanvas(globalW, globalH).position(offset, offset);
    frameRate(20);
    life = new Life(globalW, globalH, cellSize);

    noLoop();
}

function draw() {
    background(0);
    if (isLooping() && !mouseIsPressed) {
        life.step();
    }
    life.show();
}

function mouseDragged() {
    if (mouseX >= 0 && mouseX < globalW && mouseY >= 0 && mouseY < globalH) {
        res = life.getCellAt(mouseX, mouseY);
        coords = res[0];
        idx = coords[1] * life.w + coords[0];
        if (!draggedCells.includes(idx)) {
            draggedCells.push(idx);
            life.toggle(coords);
            draw();
        }
    }
}

function mouseReleased() {
    if (draggedCells.length == 0) {
        if (mouseX >= 0 && mouseX < globalW && mouseY >= 0 && mouseY < globalH) {
            res = life.getCellAt(mouseX, mouseY);
            life.toggle(res[0]);
            draw();
        }
    } else {
        draggedCells = [];
    }
}

function keyPressed() {
    if (key == " ") {
        if (isLooping()) {
            noLoop();
        } else {
            loop();
        }
    } else if (keyCode === RIGHT_ARROW) {
        life.step();

        draw();
    }
}
