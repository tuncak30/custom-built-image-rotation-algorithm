import {useEffect, useRef, useState} from "react";
import useWindowResize from "../Hooks/useWindowResize";

function Canvas(props) {
    const {
        uploadedImgSrc,
        imgElement,
        setImageDimensions,
        rotationDegree
    } = props;

    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    /* Get window height and width onResize */
    const [height, width] = useWindowResize();

    /* Performance API timer start and timer end */
    const [t0, setT0] = useState(0);
    const [t1, setT1] = useState(0);

    useEffect(() => {
        if(imgElement.current){
            rotate(imgElement.current, rotationDegree);
        }
    }, [height, width, imgElement, rotationDegree])

    function rotate(img, deg) {
        setT0(performance.now());
        deg = deg ? deg : 0;
        const ctx = canvasRef.current.getContext("2d");
        const canvas = ctx.canvas;

        // We will find the hypotenuse of the image in order to restrict the width and height when rotating
        const hypotenuse = Math.hypot(img.width, img.height);
        const hRatio = canvas.width  / ((hypotenuse >= img.width) ? hypotenuse : img.width);
        const vRatio =  canvas.height / ((hypotenuse >= img.height) ? hypotenuse : img.height);
        const ratio  = Math.min(hRatio, vRatio) ;
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0,0,canvas.width, canvas.height);

        if(img.width > canvas.width || img.height > canvas.height){ // if the uploaded image is bigger than the canvas area, we will resize it then draw to canvas
            ctx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        }
        else{ // otherwise we can draw to canvas and center it
            ctx.drawImage(img, ((canvas.width / 2) - (img.width / 2)), ((canvas.height / 2) - (img.height / 2)), img.width, img.height);
        }

        const pxWrite = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const w32 = new Uint32Array(pxWrite.data.buffer);
        const pxRead = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const r32 = new Uint32Array(pxRead.data.buffer);
        const ang = - 1 * (deg * (Math.PI / 180)); // multiply by -1 to get clockwise rotation on positive values

        scanLine(canvas.width / 2, canvas.height / 2,  ang, r32, w32, canvas.width, canvas.height);
        ctx.putImageData(pxWrite,0,0);

        setT1(performance.now());
    }

    function scanLine(ox, oy, ang, r32, w32, W, H) {
        // We used this question on stackoverflow for creating a rotation algorithm on our canvas element
        // https://stackoverflow.com/questions/65836588/rotating-an-image-without-canvasrenderingcontext2d-rotate

        const xAx = Math.cos(ang);
        const xAy = Math.sin(ang);
        w32.fill(0);
        let rx, ry, idxW, x = 0, y = 0;
        while (y < H) {
            const xx = x - ox, yy = y - oy;
            rx = xx * xAx - yy * xAy + ox;
            ry = xx * xAy + yy * xAx + oy;
            idxW = y * W + x;
            while (x < W) {
                if (rx >= 0 && rx < W && ry >= 0 && ry < H) {
                    w32[idxW] = r32[(ry | 0) * W + (rx | 0)];
                }
                idxW ++;
                rx += xAx;
                ry += xAy;
                x++;
            }
            y ++;
            x = 0;
        }
    }

    return (
        <div ref={containerRef} id="canvas-container">
            {
                (t1 - t0) === 0 ? null : <div id="timer">Rendered in {Math.round((t1 - t0) * 100) / 100} ms</div>
            }

            <canvas ref={canvasRef} width={window.innerWidth <= 580 ? window.innerWidth : (width - 250)} height={height - 60}>
            {
                uploadedImgSrc ?
                    <img
                    src={uploadedImgSrc}
                    alt="Uploaded alt tag"
                    ref={imgElement}
                    onLoad={() => {
                        rotate(imgElement.current, rotationDegree);
                        setImageDimensions(prev => ({
                                ...prev,
                                height: imgElement.current.naturalHeight,
                                width: imgElement.current.naturalWidth,
                            }))
                    }}
                    /> : null
            }
            </canvas>
        </div>
    );
}

export default Canvas;
