function complexAbsolute(complex) {
    return Math.sqrt(complex.re ** 2 + complex.im ** 2);
}
function complexSquare(complex) {
    return {
        re: (complex.re ** 2 - complex.im ** 2),
        im: (2 * complex.re * complex.im)
    };
}

export default function(p, scene) {
    //TODO make userConfig a third parameter and get n value from that
    const n = 500 //amount of iterations per pixel
    const planeRanges = {
        left : p.map(scene.canvasStartPosition.x, 0, p.width, -2.5, 1.5),
        right : p.map(scene.canvasEndPosition.x, 0, p.width, -2.5, 1.5),
        top : p.map(scene.canvasStartPosition.y, 0, p.height, -2, 2),
        bottom : p.map(scene.canvasEndPosition.y, 0, p.height, -2, 2)
    }
    //TODO same for resolution
    const image = p.createImage(1000, 1000)
    image.loadPixels()
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            let pix = (x + y * image.width) * 4
            let isInMandelbrot = true
            let c = {
                re : p.map(x, 0, image.width, planeRanges.left, planeRanges.right),
                im : p.map(y, 0, image.height, planeRanges.top, planeRanges.bottom)
            }
            let z = {
                re : 0,
                im : 0
            }
            let i
            for (i = 0; i <= n; i++) {
                z = complexSquare(z)
                z.re += c.re
                z.im += c.im
                if (complexAbsolute(z) > 2) {
                    isInMandelbrot = false
                    break
                }
            }
            if (isInMandelbrot) {
                image.pixels[pix + 1] = 0;
                image.pixels[pix + 0] = 0;
                image.pixels[pix + 2] = 0;
                image.pixels[pix + 3] = 255;
            } else {
                image.pixels[pix + 0] = 0;
                image.pixels[pix + 1] = 0;
                image.pixels[pix + 2] = i*3;
                image.pixels[pix + 3] = 255;
            }
        }
    }
    image.updatePixels()
    return image
}