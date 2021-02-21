let mandelbrotImg;          //image mandelbrot set is being drew onto   
let myCanvas;               //p5 canvas object
let mouseIsOver = true;
let scene = {};
let renderedImgs = []
let renderBtn;
function setup() {
    scene = {
        position : createVector(0,0),
        zoom : 1,
        vecToCanvasCoor(vector) {
            return p5.Vector.add(vector.mult(this.zoom), this.position)
        },
        vecToSceneCoor(vector) {
            return p5.Vector.sub(vector, this.position).mult(1/this.zoom)
        },
        get canvasStartPosition() {
            return this.vecToSceneCoor(createVector(0,0))
        },
        get canvasEndPosition() {
            return this.vecToSceneCoor(createVector(width,height))
        },
        get dimensions() {
            return this.canvasEndPosition.sub(this.canvasStartPosition)
        }
    }
    myCanvas = createCanvas(720, 720).parent('canvasContainer');
    myCanvas.mousePressed(event => {
        cursor(HAND)
        return false;
    });
    myCanvas.mouseReleased(event => {
        cursor('default')
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
    renderBtn = createButton('render')
    renderBtn.parent('menuContainer')
    renderBtn.mousePressed((event) => {
        let {x,y} = scene.canvasStartPosition
        let {x : width, y : height} = scene.dimensions
        renderedImgs.push({img:loadImage("static/pies.png"), x , y , width, height})
    })
    tint(255, 128)
    renderedImgs.push({img:loadImage("static/pies.png"), x : 0, y : 0, width, height})
}
function draw() {
    translate(scene.position)
    scale(scene.zoom)
    background(51);
    //console.log(scene.vecToSceneCoor(createVector(mouseX,mouseY)))
    if (mouseIsPressed && mouseIsOver) {
        scene.position.add(mouseX - pmouseX, mouseY - pmouseY)
    }
    for (const imgData of renderedImgs) {
        image(imgData.img, imgData.x, imgData.y, imgData.width, imgData.height)
    }
}