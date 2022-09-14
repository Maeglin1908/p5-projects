class Life {
    constructor(w, h, cellSize) {
        this.nbCol;
        this.w = w / cellSize;
        this.h = h / cellSize;
        this.cellSize = cellSize;
        this.grid = new Array(this.w * this.h);
    }

    show() {
        push();
        stroke(20);
        for (let i = 0; i <= this.w; i++) {
            line(i * this.cellSize, 0, i * this.cellSize, this.h * this.cellSize);
        }

        for (let i = 0; i <= this.h; i++) {
            line(0, i * this.cellSize, this.w * this.cellSize, i * this.cellSize);
        }

        pop();
        push();
        this.grid.forEach(function (cell) {
            if (cell) {
                cell.show();
            }
        });
        pop();
    }
    getCell(x, y) {
        let idx = this.w * y + x;
        return [[x, y], this.grid[idx]];
    }

    getCellAt(xCoord, yCoord) {
        let x = Math.floor(xCoord / this.cellSize);
        let y = Math.floor(yCoord / this.cellSize);
        return this.getCell(x, y);
    }

    toggle(coords) {
        let idx = this.w * coords[1] + coords[0];
        if (this.grid[idx]) {
            this.grid[idx] = undefined;
        } else {
            this.grid[idx] = new Cell(coords[0], coords[1], this.cellSize);
        }
    }

    getNeighboors(x, y) {
        let neighboors = [];
        neighboors.push(this.getCell(x - 1, y - 1)[1]);
        neighboors.push(this.getCell(x, y - 1)[1]);
        neighboors.push(this.getCell(x + 1, y - 1)[1]);
        neighboors.push(this.getCell(x - 1, y)[1]);
        neighboors.push(this.getCell(x + 1, y)[1]);
        neighboors.push(this.getCell(x - 1, y + 1)[1]);
        neighboors.push(this.getCell(x, y + 1)[1]);
        neighboors.push(this.getCell(x + 1, y + 1)[1]);
        return neighboors;
    }

    countAlives(neighboors) {
        let cnt = 0;
        for (let i = 0; i < neighboors.length; i++) {
            if (neighboors[i]) {
                cnt++;
            }
        }
        return cnt;
    }

    step() {
        let newGrid = [...this.grid];

        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                let current = this.getCell(x, y)[1];
                let neighboors = this.getNeighboors(x, y);
                let nbAlives = this.countAlives(neighboors);
                if (current && (nbAlives < 2 || nbAlives > 3)) {
                    newGrid[this.w * y + x] = undefined;
                } else if (!current && nbAlives == 3) {
                    newGrid[this.w * y + x] = new Cell(x, y, this.cellSize);
                }
            }
        }
        this.grid = newGrid;
    }
}
