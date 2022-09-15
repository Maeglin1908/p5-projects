class Snake {
    constructor() {
        this.body = [];
        this.body.push(createVector(Math.floor(w / 2), Math.floor(h / 2)));
        this.dirx = 1;
        this.diry = 0;
    }

    score() {
        return this.body.length - 1;
    }

    setDir(dirx, diry) {
        this.dirx = dirx;
        this.diry = diry;
    }
    update() {
        this.body.unshift(createVector(this.body[0].x + this.dirx, this.body[0].y + this.diry));
        this.body.pop();
    }

    show() {
        fill(255);
        noStroke();
        for (let part of this.body) {
            rect(part.x, part.y, 1, 1);
        }
    }

    eat(food) {
        if (food.pos.x == this.body[0].x && food.pos.y == this.body[0].y) {
            return true;
        }
        return false;
    }

    growUp() {
        this.body.push(createVector(this.body[this.body.length - 1].x, this.body[this.body.length - 1].y));
    }

    win() {
        return w * h == this.body.length;
    }

    lose() {
        let head = this.body[0];
        if (head.x >= w || head.x < 0 || head.y >= h || head.y < 0) {
            return true;
        }
        head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            let part = this.body[i];
            if (head.x == part.x && head.y == part.y) {
                return true;
            }
        }
        return false;
    }
}
