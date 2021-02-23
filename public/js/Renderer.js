class Renderer {

    constructor(p5instance, renderMethod) {
        this.p = p5instance
        this.renderMethod = renderMethod
        this.renderedImgs = []
    }

    render(scene) {
        let {x,y} = scene.canvasStartPosition
        let {x : width, y : height} = scene.dimensions
        Promise.resolve(this.renderMethod(this.p, scene)).then(image => {
            this.renderedImgs.push(new imageData(image, x, y, width, height))
        })
    }

    draw() {
        //TODO add optimalisation, dont draw image that is 100% covered on the screen or is outside of it
        for (const imgData of this.renderedImgs) {
            this.p.image(imgData.src, imgData.x, imgData.y, imgData.width, imgData.height)
        }
    }
}
class imageData {
    constructor(src, x, y, width, height) {
        this.src = src
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}

export default Renderer