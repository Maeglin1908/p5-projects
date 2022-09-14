class Maze {
    constructor(width, height, cellSize) {
        this.width = width;
        this.height = height;
        this.nbCols = Math.floor(width / cellSize);
        this.nbRows = Math.floor(height / cellSize);
        this.cellSize = cellSize;
        this.grid = new Array(this.nbRows);
        for (let i = 0; i < this.nbRows; i++) {
            this.grid[i] = new Array(this.nbCols);
        }
        for (let i = 0; i < this.nbRows; i++) {
            for (let j = 0; j < this.nbCols; j++) {
                this.grid[i][j] = new Cell(cellSize, j, i);
            }
        }
    }

    show() {
        push();
        for (let i = 0; i < this.nbRows; i++) {
            for (let j = 0; j < this.nbCols; j++) {
                this.grid[i][j].show();
            }
        }
        pop();

        push();
        fill(230, 25, 235);
        rectMode(CENTER);
        rect(this.cellSize / 2, this.cellSize / 2, 0.75 * this.cellSize, 0.75 * this.cellSize);

        fill(0, 255, 255);
        rectMode(CENTER);
        translate(this.cellSize * (this.nbCols - 1), this.cellSize * (this.nbRows - 1));
        rect(this.cellSize / 2, this.cellSize / 2, 0.75 * this.cellSize, 0.75 * this.cellSize);
        pop();
    }

    getNeighboors(x, y) {
        let neighboors = [];
        if (this.grid[y] && this.grid[y][x - 1] && !this.grid[y][x - 1].visited) neighboors.push(this.grid[y][x - 1]);
        if (this.grid[y] && this.grid[y][x + 1] && !this.grid[y][x + 1].visited) neighboors.push(this.grid[y][x + 1]);
        if (this.grid[y - 1] && this.grid[y - 1][x] && !this.grid[y - 1][x].visited)
            neighboors.push(this.grid[y - 1][x]);
        if (this.grid[y + 1] && this.grid[y + 1][x] && !this.grid[y + 1][x].visited)
            neighboors.push(this.grid[y + 1][x]);
        return neighboors;
    }

    getCellAt(x, y) {
        return this.grid[y][x];
    }
}
