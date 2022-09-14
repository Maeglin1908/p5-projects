stars = new Array(500);

function setup() {
    createCanvas(windowWidth - 60, windowHeight - 60);
    for (let i = 0; i < stars.length; i++) {
        stars[i] = new Star();
    }
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    stars.forEach(function (star) {
        star.update();
        star.show();
    });
}
