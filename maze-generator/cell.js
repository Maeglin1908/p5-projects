class Cell {
    constructor(size, x, y) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.visited = false;
        this.walls = [true, true, true, true]; // Top, Right, Bottom, Left
    }

    show() {
        // fill(125);
        stroke(255);
        this.walls[0] && line(this.x * this.size, this.y * this.size, (this.x + 1) * this.size, this.y * this.size);
        this.walls[1] &&
            line((this.x + 1) * this.size, this.y * this.size, (this.x + 1) * this.size, (this.y + 1) * this.size);

        this.walls[2] &&
            line(this.x * this.size, (this.y + 1) * this.size, (this.x + 1) * this.size, (this.y + 1) * this.size);
        this.walls[3] && line(this.x * this.size, this.y * this.size, this.x * this.size, (this.y + 1) * this.size);
        // rect(this.x * this.size, this.y * this.size, this.size, this.size);
    }

    makePath(other) {
        let idx_a = -1;
        let idx_b = -1;
        if (this.x < other.x) {
            idx_a = 1;
            idx_b = 3;
        } else if (this.x > other.x) {
            idx_a = 3;
            idx_b = 1;
        } else if (this.y < other.y) {
            idx_a = 2;
            idx_b = 0;
        } else if (this.y > other.y) {
            idx_a = 0;
            idx_b = 2;
        }
        this.walls[idx_a] = false;
        other.walls[idx_b] = false;
    }

    pathExistsTo(target) {
        let idx_a = -1;
        let idx_b = -1;
        if (this.x < target.x) {
            idx_a = 1;
            idx_b = 3;
        } else if (this.x > target.x) {
            idx_a = 3;
            idx_b = 1;
        } else if (this.y < target.y) {
            idx_a = 2;
            idx_b = 0;
        } else if (this.y > target.y) {
            idx_a = 0;
            idx_b = 2;
        }

        if (this.walls[idx_a] === false && target.walls[idx_b] === false) {
            return true;
        } else {
            return false;
        }
    }
}
