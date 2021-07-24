import {useEffect, useRef} from "react";
import useWindowResize from "../Hooks/useWindowResize";

function Canvas(props) {
    const {
        uploadedImgSrc,
        imgElement,
        setImageDimensions
    } = props;

    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [height, width] = useWindowResize();

    useEffect(() => {
        if(imgElement.current){
            drawImage(imgElement.current);
        }
    }, [height, width])

    function drawImage(img) {
        const ctx = canvasRef.current.getContext('2d');
        const canvas = ctx.canvas;
        const hRatio = canvas.width  / img.width;
        const vRatio =  canvas.height / img.height;
        const ratio  = Math.min(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0,0,canvas.width, canvas.height);

        if(img.width > canvas.width || img.height > canvas.height){
            ctx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        }
        else{
            ctx.drawImage(img, (canvas.width / 2), (canvas.height / 2), img.width, img.height);
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

                        /*const imageData = ctx.getImageData(0, 0, imgElement.current.naturalWidth, imgElement.current.naturalHeight);
                        console.log(imageData);*/

                        setImageDimensions(prev => (
                            {
                                ...prev,
                                height: imgElement.current.naturalHeight,
                                width: imgElement.current.naturalWidth,
                            }
                        ))
                    }}
                    /> : null
            }
            </canvas>
        </div>
    );
}

export default Canvas;
