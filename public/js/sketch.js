import Scene from './Scene.js'

const sketch = (p) => {

    let myCanvas;
    let mouseIsOver = true;
    let scene = {};
    let renderedImgs = []
    let renderBtn;

    p.setup = function() {
        scene = new Scene(p, p.createVector(0,0), 1)
        myCanvas = p.createCanvas(720, 720)
        p.pixelDensity(1);

        myCanvas.mousePressed(event => {
            p.cursor(p.HAND)
            return false;
        });
        myCanvas.mouseReleased(event => {
            p.cursor('default')
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
            scene.position.mult(scene.zoom / pzoom).sub((scene.zoom / pzoom - 1)*p.mouseX, (scene.zoom / pzoom - 1)*p.mouseY)
        });
        //loadPixels();
        //iterationPathCheckbox = createCheckbox('draw f(z) iteration path').parent('menuContainer')
        renderBtn = p.createButton('render').parent('menuContainer')
        renderBtn.mousePressed((event) => {
            let {x,y} = scene.canvasStartPosition
            let {x : width, y : height} = scene.dimensions
            renderedImgs.push({img:p.loadImage("static/pies.png"), x , y , width, height})
        })
        p.tint(255, 128)
        renderedImgs.push({img:p.loadImage("static/pies.png"), x : 0, y : 0, width : p.width, height : p.height})
    }
    p.draw = function () {
        p.translate(scene.position)
        p.scale(scene.zoom)
        p.background(51);
        //console.log(scene.vecToSceneCoor(p.createVector(p.mouseX, p.mouseY)))
        if (p.mouseIsPressed && mouseIsOver) {
            scene.position.add(p.mouseX - p.pmouseX, p.mouseY - p.pmouseY)
        }
        for (const imgData of renderedImgs) {
            p.image(imgData.img, imgData.x, imgData.y, imgData.width, imgData.height)
        }
    }
}

export default sketch