export default class Scene {
    constructor(p5instance, position, zoom) {
        this.p = p5instance
        this.position = position
        this.zoom = zoom
    }
    vecToCanvasCoor(vector) {
        return p5.Vector.add(vector.mult(this.zoom), this.position)
    }
    vecToSceneCoor(vector) {
        return p5.Vector.sub(vector, this.position).mult(1/this.zoom)
    }
    get canvasStartPosition() {
        return this.vecToSceneCoor(this.p.createVector(0,0))
    }
    get canvasEndPosition() {
        return this.vecToSceneCoor(this.p.createVector(this.p.width, this.p.height))
    }
    get dimensions() {
        return this.canvasEndPosition.sub(this.canvasStartPosition)
    }
}