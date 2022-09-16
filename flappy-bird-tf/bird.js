class Bird {
    constructor(brain) {
        this.pos = createVector(birdOffset, height / 2);
        this.width = birdWidth;
        this.height = birdHeight;
        this.velocity = 0;
        this.gravity = 0.4;
        this.score = 0;
        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(0.1);
        } else {
            this.brain = new NeuralNetwork([5, 8, 2]);
        }
        this.fitness = 0;
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

    think() {
        // Inputs for neural network :
        // - Y position
        // - Y velocity
        // - X position of closest no-passed pipe
        // - Y door-top of closest no-passed pipe
        // - Y door-bottom of closest no-passed pipe
        // if (this.velocity < 0) {
        //     return;
        // }
        let closest = this.getClosestPipe();

        if (closest) {
            let pipePartsPos = closest.getPartsPos();
            let birdY = map(this.pos.y, 0, height, 0, 1);
            let birdVelocity = map(this.velocity, -15, 15, 0, 1);
            let closestX = map(closest.pos.x, 0, width, 0, 1);
            let closestDoorTop = map(pipePartsPos.top.y + pipePartsPos.top.height, 0, height, 0, 1);
            let closestDoorBottom = map(pipePartsPos.bottom.y, 0, height, 0, 1);
            let inputs = [birdY, birdVelocity, closestX, closestDoorTop, closestDoorBottom];
            let decision = this.brain.predict(inputs);

            if (decision[1] > decision[0]) {
                this.jump();
            }
        }
    }

    getClosestPipe() {
        let distance = Infinity;
        let closest = undefined;
        for (let pipe of pipes) {
            let pipeDistance = abs(this.pos.x + this.width - pipe.pos.x);
            if (this.pos.x < pipe.pos.x + pipeWidth && pipeDistance < distance) {
                distance = pipeDistance;
                closest = pipe;
            }
        }
        return closest;
    }
}
