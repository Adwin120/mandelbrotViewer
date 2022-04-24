const n = 500

function complexAbsolute(complex) {
    return Math.sqrt(complex.re ** 2 + complex.im ** 2)
}
function complexSquare(complex) {
    return {
        re: (complex.re ** 2 - complex.im ** 2),
        im: (2 * complex.re * complex.im)
    }
}
function map(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function messageHandler(event) {
    let {id, width, height, planeRanges} = event.data;
    let pixelsArray = new Uint8ClampedArray(width * height * 4)
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let pix = (x + y * width) * 4
            let isInMandelbrot = true
            let c = {
                re : map(x, 0, width, planeRanges.left, planeRanges.right),
                im : map(y, 0, height, planeRanges.top, planeRanges.bottom)
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
                pixelsArray[pix + 1] = 0
                pixelsArray[pix + 0] = 0
                pixelsArray[pix + 2] = 0
                pixelsArray[pix + 3] = 255
            } else {
                pixelsArray[pix + 0] = 0
                pixelsArray[pix + 1] = 0
                pixelsArray[pix + 2] = i*3
                pixelsArray[pix + 3] = 255
            }
        }
    }
    postMessage({id, buffer : pixelsArray.buffer}, [pixelsArray.buffer]);
}

onmessage = (e) => {
    messageHandler(e);
}