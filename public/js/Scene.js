import { imageData } from "./Renderer"

export default class Scene {
    constructor(p5instance, position, zoom) {
        this.p = p5instance
        this.position = position
        this.zoom = zoom
    }
    vecToCanvas(vector) {
        return p5.Vector.add(vector, this.position).mult(this.zoom)
    }
    vecToScene(vector) {
        return p5.Vector.sub(vector.mult(1/this.zoom), this.position)
    }
    coorXtoCanvas(x) {
        return (x + this.position.x) * this.zoom
    }
    coorYtoCanvas(y) {
        return (y + this.position.y) * this.zoom
    }
    coorXtoScene(x) {
        return x / this.zoom - this.position.x
    }
    coorYtoScene(y) {
        return y / this.zoom - this.position.y
    }
    get canvasStartPosition() {
        return this.vecToScene(this.p.createVector(0,0))
    }
    get canvasEndPosition() {
        return this.vecToScene(this.p.createVector(this.p.width, this.p.height))
    }
    get dimensions() {
        return this.canvasEndPosition.sub(this.canvasStartPosition)
    }
    draw(imgdata) {
        //TODO refactor this method, maybe allow another argument set or something
        console.assert(imgdata instanceof imageData)
        let {x, y} = this.vecToCanvas(this.p.createVector(imgdata.x,imgdata.y))
        let width = imgdata.width * this.zoom
        let height = imgdata.height * this.zoom
        this.p.image(
            imgdata.src, 
            x,y,width,height
        )
    }
}