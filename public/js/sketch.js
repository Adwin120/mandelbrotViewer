import Scene from './Scene.js'
import renderMethod from './render_strategies/rainbow_dog.js'

const sketch = (p) => {

    let myCanvas
    let mouseIsOver = true
    let scene = {}
    let renderedImgs = []
    let renderBtn
    //TODO refactor render function, change word render to load
    //let imageLoader = {}
    const render = () => {
        let {x,y} = scene.canvasStartPosition
        let {x : width, y : height} = scene.dimensions
        Promise.resolve(renderMethod(p, scene)).then(image => {
            renderedImgs.push({img : image, x , y , width, height})
        })
    }

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
            render()
        })
        //p.tint(255, 128)
        render()
    }
    p.draw = function () {
        p.background(51);
        p.translate(scene.position)
        p.scale(scene.zoom)
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