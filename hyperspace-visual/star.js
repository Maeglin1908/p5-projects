class Star {
    constructor() {
        this.x = random(-width / 2, width / 2);
        this.y = random(-height / 2, height / 2);
        this.z = random(width);
        this.pz = this.z;
    }

    update() {
        this.z -= map(mouseX, 0, width, -100, 100);
        if (this.z < 1) {
            this.z = random((width / 5) * 3, width);
            this.x = random(-width / 2, width / 2);
            this.y = random(-height / 2, height / 2);
            this.pz = this.z;
        } else if (this.z > width) {
            this.z = 1;
            this.x = random(-width / 2, width / 2);
            this.y = random(-height / 2, height / 2);
            this.pz = this.z;
        }
    }

    show() {
        fill(255);
        noStroke();
        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);
        let radius = map(this.z, 0, width, 16, 0);
        ellipse(sx, sy, radius, radius);

        stroke(50);
        let px = map(this.x / this.pz, 0, 1, 0, width);
        let py = map(this.y / this.pz, 0, 1, 0, height);
        line(px, py, sx, sy);
    }
}
