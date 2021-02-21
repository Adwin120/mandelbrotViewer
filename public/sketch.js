const m = 20;
let mandelbrotImg;          //image mandelbrot set is being drew onto   
let myCanvas;               //p5 canvas object
let mouseIsOver = true;
let testImage;
let scene;
function setup() {
    scene = {
        position : createVector(0,0),
        zoom : 1,
        vecToCanvasCoor(vector) {
            return p5.Vector.add(vector.mult(this.zoom), this.position)
        },
        vecToSceneCoor(vector) {
            return p5.Vector.sub(vector, this.position).mult(1/this.zoom)
        }
    }
    myCanvas = createCanvas(720, 720).parent('canvasContainer');
    myCanvas.mousePressed(event => {
        myCanvas.canvas.style.cursor = 'pointer';
        return false;
    });
    myCanvas.mouseReleased(event => {
        myCanvas.canvas.style.cursor = 'default';
        return false;
    });
    myCanvas.mouseOver(event => {
        mouseIsOver = true;
    });
    myCanvas.mouseOut(event => {
        mouseIsOver = false;
    });
    myCanvas.mouseWheel(event => {
        let pzoom = scene.zoom
        scene.zoom *= event.deltaY > 0 ? 0.9 : 1.1
        scene.position.mult(scene.zoom / pzoom).sub((scene.zoom / pzoom - 1)*mouseX, (scene.zoom / pzoom - 1)*mouseY)
    });
    pixelDensity(1);
    //loadPixels();
    //mandelbrotImg = createImage(720, 720);
    //iterationPathCheckbox = createCheckbox('draw f(z) iteration path').parent('menuContainer')
    tint(255, 128)
    testImage = loadImage("static/pies.png")
}
function draw() {
    translate(scene.position)
    scale(scene.zoom)
    background(51);
    //console.log(scene.vecToSceneCoor(createVector(mouseX,mouseY)))
    if (mouseIsPressed && mouseIsOver) {
        scene.position.add(mouseX - pmouseX, mouseY - pmouseY)
    }
    image(testImage,0,0,width,height)
}