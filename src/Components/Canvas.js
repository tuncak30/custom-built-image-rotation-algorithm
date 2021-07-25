import {useEffect, useRef} from "react";
import useWindowResize from "../Hooks/useWindowResize";

function Canvas(props) {
    const {
        uploadedImgSrc,
        imgElement,
        setImageDimensions,
        deg
    } = props;

    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [height, width] = useWindowResize();

    useEffect(() => {
        if(imgElement.current){
            drawImage(imgElement.current);
        }
    }, [height, width, imgElement])

    useEffect(() => {
        if(deg !== "" && imgElement.current){
            drawImage(imgElement.current, deg);
        }
    }, [deg])

    function drawImage(img, deg) {
        const ctx = canvasRef.current.getContext("2d");
        const canvas = ctx.canvas;
        const hRatio = canvas.width  / img.width;
        const vRatio =  canvas.height / img.height;
        const ratio  = Math.min(hRatio, vRatio);
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

        const ang = deg * (Math.PI / 180);
        scanLine(canvas.width / 2, canvas.height / 2, ang, r32, w32, canvas.width, canvas.height);
        ctx.putImageData(pxWrite,0,0);
    }

    function scanLine(ox, oy, ang, r32, w32, W, H) {
        const xAx = Math.cos(ang);
        const xAy = Math.sin(ang);
        w32.fill(0);
        var rx, ry, idxW, x = 0, y = 0;
        while (y < H) {
            const xx = x - ox, yy = y - oy;
            rx = xx * xAx - yy * xAy + ox; // Get image coords for row start
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
            <canvas ref={canvasRef} width={width - 250} height={height - 60}>
            {
                uploadedImgSrc ?
                    <img
                    src={uploadedImgSrc}
                    alt="Uploaded alt tag"
                    ref={imgElement}
                    onLoad={() => {
                        drawImage(imgElement.current);
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
