class Pipe {
    constructor() {
        this.pos = createVector(width, 0);
        this.doorTop = Math.floor(random(0, height - pipeSpace));
        this.doorBottom = this.doorTop + pipeSpace;
        this.scored = false;
    }

    update() {
        this.pos.x -= pipeSpeed;
        
    }

    show() {
        rectMode(CORNER);
        fill(200, 50, 0);
        rect(this.pos.x, this.pos.y, pipeWidth, this.doorTop);
        rect(this.pos.x, this.doorBottom, pipeWidth, height - this.doorBottom);
    }

    disappeared() {
        return this.pos.x + pipeWidth <= 0;
    }

    getPartsPos() {
        let part1 = { x: this.pos.x, y: this.pos.y, width: pipeWidth, height: this.doorTop };
        let part2 = { x: this.pos.x, y: this.doorBottom, width: pipeWidth, height: height - this.doorBottom };
        return { top: part1, bottom: part2 };
    }
}
