class Creator {
    constructor() {
        this.maze = undefined;
        this.x = 0;
        this.y = 0;
        this.stack = new Array();
        this.start = undefined;
        this.end = undefined;
    }

    setMaze(maze) {
        this.maze = maze;
        this.start = maze.getCellAt(0, 0);

        this.start.visited = true;
        this.stack.push(this.start);

        this.end = maze.getCellAt(maze.nbCols - 1, maze.nbRows - 1);
    }

    move(dirX, dirY) {
        if (dirX !== 0) {
            if (dirX === -1 && this.x === 0) {
                return false;
            } else if (dirX === 1 && this.x >= this.maze.nbCols - 1) {
                return false;
            }
        } else if (dirY !== 0) {
            if (dirY === -1 && this.y === 0) {
                return false;
            } else if (dirY === 1 && this.y >= this.maze.nbRows - 1) {
                return false;
            }
        }
        let current = maze.getCellAt(this.x, this.y);
        let target = maze.getCellAt(this.x + dirX, this.y + dirY);
        if (current.pathExistsTo(target)) {
            this.x += dirX;
            this.y += dirY;
            return true;
        }
        return false;
    }

    show() {
        push();
        let size = maze.cellSize;
        stroke(255);
        rectMode(CENTER);
        translate(this.x * size, this.y * size);

        fill(255, 0, 0);
        rect(size / 2, size / 2, size * 0.75, size * 0.75);
        pop();
        if (this.x == this.end.x && this.y == this.end.y) {
            push();
            fill(0, 255, 0);
            background(255, 255, 255, 150);
            fill(0, 200, 0);
            textSize(80);
            textAlign(CENTER, CENTER);
            text("YOU WIN !", maze.width / 2, maze.height / 2);
            pop();
        }
    }

    step() {
        let current = maze.getCellAt(this.x, this.y);
        let neighboors = maze.getNeighboors(this.x, this.y);
        let cell = null;
        if (neighboors.length > 0) {
            this.stack.push(current);
            cell = random(neighboors);
        } else if (this.stack.length > 0) {
            cell = this.stack.pop();
        }
        if (cell) {
            // console.log(cell);
            cell.visited = true;
            current.makePath(cell);
            this.x = cell.x;
            this.y = cell.y;
        }
    }
}
