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
            console.log(image)
            this.renderedImgs.push(new imageData(image, x, y, width, height))
        })
    }
}
export class imageData {
    constructor(src, x, y, width, height) {
        this.src = src
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}

export default Renderer