const n = 100;
const m = 20;
// const drawAxes = (img) => {
//     zeroY = mapToCanvasCoordinates(0, 'y');
//     for (let x = 0; x < width; x++) {
//         let pix = (x + zeroY * width) * 4
//         img.pixels[pix + 0] = 50;
//         img.pixels[pix + 1] = 50;
//         img.pixels[pix + 2] = 50;
//         img.pixels[pix + 3] = 255;
//     }
//     zeroX = mapToCanvasCoordinates(0, 'x');
//     for (let y = 0; y < height; y++) {
//         let pix = (zeroX + y * width) * 4
//         img.pixels[pix + 0] = 50;
//         img.pixels[pix + 1] = 50;
//         img.pixels[pix + 2] = 50;
//         img.pixels[pix + 3] = 255;
//     }
// }
function messageHandler(event) {
    [width, height, axesRanges] = event.data;
    function map (value, in_min, in_max, out_min, out_max) {
        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      }
    function complexAbsolute(complex) {
        return Math.sqrt(complex.re ** 2 + complex.im ** 2);
    }
    function complexSquare(complex) {
        return {
            re: (complex.re ** 2 - complex.im ** 2),
            im: (2 * complex.re * complex.im)
        };
    }
    function mapToPlaneCoordinates(coordinate, axis) {
        if (axis === 'x') {
            return map(coordinate, 0, width, axesRanges.xLeft, axesRanges.xRight);
        } else if (axis === 'y') {
            return map(coordinate, 0, height, axesRanges.yLeft, axesRanges.yRight);
        } else {
            throw new Error('axis argument can only be an "x" or "y" string');
        }
    }
    let pixels = new Uint8ClampedArray(width * height * 4);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            isInMandelbrot = true
            let c = {
                re: mapToPlaneCoordinates(x, 'x'),
                im: mapToPlaneCoordinates(y, 'y')
            };
            let z = {
                re: 0,
                im: 0
            };
            let i;
            for (i = 0; i <= n; i++) {
                z = complexSquare(z);
                z.re = z.re + c.re;
                z.im = z.im + c.im;
                if (complexAbsolute(z) > 2) {
                    isInMandelbrot = false;
                    break;
                }
            }
            let pix = (x + y * width) * 4;
            if (isInMandelbrot) {
                pixels[pix + 1] = 0;
                pixels[pix + 0] = 0;
                pixels[pix + 2] = 0;
                pixels[pix + 3] = 255;
            } else {
                pixels[pix + 0] = 0;
                pixels[pix + 1] = 0;
                pixels[pix + 2] = i*3;
                pixels[pix + 3] = 255;
            }
        }
    }
    postMessage(pixels);
}
onmessage = (e) => {
    messageHandler(e);
}