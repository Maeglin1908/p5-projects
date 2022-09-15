class Food {
    constructor() {
        this.pos = createVector(Math.floor(random(w)), Math.floor(random(h)));
    }

    show() {
        fill(200, 20, 0);
        noStroke();
        rect(this.pos.x, this.pos.y, 1, 1);
    }

    onSnake(snake) {
        for (let part of snake.body) {
            if (this.pos.x == part.x && this.pos.y == part.y) {
                return true;
            }
        }
        return false;
    }
}
