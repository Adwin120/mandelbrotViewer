const width = 1000
const height = 1000

let myWorker = new Worker('./static/js/render_strategies/mandelbrot_worker_strategy/worker.js')
let renderingImages = []

export default function(p, scene) {
    const image = p.createImage(width, height)
    //TODO
    //thats a memory leak move to Map<Integer, p5Image>
    renderingImages.push(image)
    image.loadPixels()
    const planeRanges = {
        left : p.map(scene.canvasStartPosition.x, 0, p.width, -2.5, 1.5),
        right : p.map(scene.canvasEndPosition.x, 0, p.width, -2.5, 1.5),
        top : p.map(scene.canvasStartPosition.y, 0, p.height, -2, 2),
        bottom : p.map(scene.canvasEndPosition.y, 0, p.height, -2, 2)
    }
    image.pixels.fill(50);
    image.updatePixels()
    myWorker.postMessage({id: renderingImages.length - 1, width, height, planeRanges})
    return image
}

myWorker.onmessage = function(e) {
    let {id, buffer} = e.data
    renderingImages[id].pixels.set(new Uint8ClampedArray(buffer))
    renderingImages[id].updatePixels()
}