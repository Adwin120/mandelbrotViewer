export default class Scene {
    constructor(position, zoom) {
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
        return this.vecToSceneCoor(createVector(0,0))
    }
    get canvasEndPosition() {
        return this.vecToSceneCoor(createVector(width,height))
    }
    get dimensions() {
        return this.canvasEndPosition.sub(this.canvasStartPosition)
    }
}