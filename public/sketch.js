let mandelbrotImg;          //image mandelbrot set is being drew onto
let tempImg;                //placeholder for mandelbeotImg before the computation ends
let tempImgCoordinates;     //coordinates for drawing tempImg when user drags or scrolls the canvas
let myCanvas;               //p5 canvas object
let zoom = 4;               //section of the plane being showed on the canvas
let axesRanges = {
    xLeft: -2.5,
    xRight: 1.5,
    yLeft: -2,
    yRight: 2
};
let tempZoom = 1
let loading = true;
let mouseIsOver = true;
let mandelbrotWorker = new Worker('static/mandelbrot-web-worker.js');       //web worker that computes if a set of points are in the set
function complexAbsolute(complex) {
    return Math.sqrt(complex.re ** 2 + complex.im ** 2);
}
function complexSquare(complex) {
    return {
        re: (complex.re ** 2 - complex.im ** 2),
        im: (2 * complex.re * complex.im)
    };
}
function drawMandelbrot() {
    mandelbrotWorker.postMessage([mandelbrotImg.width, mandelbrotImg.height, axesRanges]);
}
mandelbrotWorker.onmessage = (e) => {
    Object.assign(mandelbrotImg.pixels, e.data)
    mandelbrotImg.updatePixels();
    loading = false;
    tempImgCoordinates.set(0,0);
    tempZoom = 1;
    console.log(e.data);
}
function mapToPlaneCoordinates(coordinate, axis) {
    if (axis === 'x') {
        return map(coordinate, 0, width, axesRanges.xLeft, axesRanges.xRight);
    } else if (axis === 'y') {
        return map(coordinate, 0, height, axesRanges.yLeft, axesRanges.yRight);
    } else {
        throw new Error('axis argument can only be an "x" or "y" string');
    }
}
function mapToCanvasCoordinates(coordinate, axis) {
    if (axis === 'x') {
        return map(coordinate, axesRanges.xLeft, axesRanges.xRight, 0, width);
    } else if (axis === 'y') {
        return map(coordinate, axesRanges.yLeft, axesRanges.yRight, 0, height);
    } else {
        throw new Error('axis argument can only be an "x" or "y" string');
    }
}
function setup() {
    tempImgCoordinates = createVector(0,0)
    myCanvas = createCanvas(720, 720).parent('canvasContainer');
    myCanvas.mousePressed(event => {
        myCanvas.canvas.style.cursor = 'pointer';
        tempImg.copy(mandelbrotImg, 0, 0, mandelbrotImg.width, mandelbrotImg.height, 0, 0, tempImg.width, tempImg.height);
        return false;
    });
    myCanvas.mouseReleased(event => {
        myCanvas.canvas.style.cursor = 'default';
        drawMandelbrot(mandelbrotImg);
        return false;
    });
    myCanvas.mouseOver(event => {
        mouseIsOver = true;
    });
    myCanvas.mouseOut(event => {
        mouseIsOver = false;
    });
    myCanvas.mouseWheel(event => {
        tempImg.copy(mandelbrotImg, 0, 0, mandelbrotImg.width, mandelbrotImg.height, 0, 0, tempImg.width, tempImg.height);
        if (event.deltaY > 0) {
            zoom *= 1.1;
            tempZoom /= 1.1;

        } else {
            zoom *= 0.9
            tempZoom *= 1.1;
        }
        loading = true;
        axesRanges.xRight = axesRanges.xLeft + zoom;
        axesRanges.yRight = axesRanges.yLeft + zoom;
        drawMandelbrot(mandelbrotImg);
    });
    pixelDensity(1);
    loadPixels();

    mandelbrotImg = createImage(720, 720);
    tempImg = createImage(720,720);
    mandelbrotImg.loadPixels();
    drawMandelbrot();
    iterationPathCheckbox = createCheckbox('draw f(z) iteration path').parent('menuContainer')
}

function draw() {
    const m = 20;
    background(51);
    if (mouseIsPressed && mouseIsOver) {
        tempImgCoordinates.set(tempImgCoordinates.x + mouseX - pmouseX, tempImgCoordinates.y + mouseY - pmouseY);
        axesRanges.xLeft -= mapToPlaneCoordinates(mouseX - pmouseX, 'x') - axesRanges.xLeft;
        axesRanges.xRight = axesRanges.xLeft + zoom;
        axesRanges.yLeft -= mapToPlaneCoordinates(mouseY - pmouseY, 'y') - axesRanges.yLeft;
        axesRanges.yRight = axesRanges.yLeft + zoom;
        loading = true;
    } else{
    }
    if (loading) {
        image(tempImg, tempImgCoordinates.x, tempImgCoordinates.y, width * tempZoom, height * tempZoom);
    } else {
        image(mandelbrotImg, 0,0);
    }
    if (iterationPathCheckbox.checked()) {
        noFill();
        stroke('red');
        beginShape();
        let dot = {
            re: mapToPlaneCoordinates(mouseX, 'x'),
            im: mapToPlaneCoordinates(mouseY, 'y')
        };
        for (let i = 0; i <= m; i++) {
            vertex(mapToCanvasCoordinates(dot.re, 'x'), mapToCanvasCoordinates(dot.im, 'y'));
            dot = complexSquare(dot);
            dot.re += mapToPlaneCoordinates(mouseX, 'x');
            dot.im += mapToPlaneCoordinates(mouseY, 'y');
        }
        endShape();
    }
}