export default function(p, scene) {
    return new Promise((resolve, reject) => {
        p.loadImage('./static/js/render_strategies/pies.png', resolve, reject)
    }).then(image => {
        image.resize(p.width,p.height)
        image.loadPixels()
        console.dir(image.pixels)
        let frequency = 0.01
        for (let i = 0; i < image.width; i++) {
            for (let j = 0; j < image.height; j++) {
                let pix = (i + j * image.width) * 4
                let alpha = p.map(i, 0, image.width, scene.canvasStartPosition.x, scene.canvasEndPosition.x)
                let beta = p.map(j, 0, image.height, scene.canvasStartPosition.y, scene.canvasEndPosition.y)
                let t = frequency*Math.hypot(alpha,beta)
                image.pixels[pix + 0] += Math.sin(t + 0) * 127
                image.pixels[pix + 1] += Math.sin(t + 2) * 127
                image.pixels[pix + 2] += Math.sin(t + 4) * 127
                image.pixels[pix + 3] = 255
            }
        }
        image.updatePixels()
        return image
    })
    
}