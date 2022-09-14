class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    show() {
        fill(200);
        rect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
}
