class Bird {
    constructor() {
        this.pos = createVector(birdOffset, height / 2);
        this.width = birdWidth;
        this.height = birdHeight;
        this.velocity = 0;
        this.gravity = 0.4;
        this.score = 0;
    }

    update() {
        this.velocity += this.gravity;
        this.pos.y += this.velocity;
    }

    show() {
        rectMode(CORNER);
        fill(10, 30, 200);
        noStroke();
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    jump() {
        this.velocity = -15 * this.gravity;
    }

    hit() {
        if (this.pos.y < 0 || this.pos.y + this.height >= height) {
            return true;
        }
        for (let pipe of pipes) {
            let partsPos = pipe.getPartsPos();

            if (this.hitBlock(partsPos.top) || this.hitBlock(partsPos.bottom)) {
                return true;
            }
        }
        return false;
    }

    hitBlock(block) {
        if (
            this.pos.x < block.x + block.width &&
            this.pos.x + this.width > block.x &&
            this.pos.y < block.y + block.height &&
            this.pos.y + this.height > block.y
        ) {
            return true;
        }
        return false;
    }

    passed(pipe) {
        return this.pos.x > pipe.pos.x + pipeWidth;
    }

    reward() {
        this.score++;
    }
}
