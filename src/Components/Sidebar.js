import {useState, useRef} from "react";
import {onlyNumbers} from "../Utils";

function Sidebar() {

    const [rotationDegree, setRotationDegree] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({width: "-", height: "-"});
    const [uploadedImgSrc, setUploadedImgSrc]  = useState(null);
    const imgElement = useRef(null);

    return (
        <aside id="sidebar">
            <img
                src={uploadedImgSrc}
                alt="Uploaded alt tag"
                ref={imgElement}
                onLoad={() => {
                    console.log(imgElement.current.naturalHeight)
                }}
            />
            <div id="file-input-container">
                <button className="big file-upload-button">Upload Image
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                            if(e.target.files[0]){
                                setUploadedImgSrc(URL.createObjectURL(e.target.files[0]));
                                setSelectedFile(e.target.files[0]);
                            }
                        }}
                    />
                </button>
            </div>
            <div id="file-data-container">
                <div className="file-data-rows">
                    <label>File:</label>
                    <span>{selectedFile ? selectedFile.name : '-'}</span>
                </div>
                <div className="file-data-rows">
                    <label>Width:</label>
                    <span>{imageDimensions.width}</span>
                </div>
                <div className="file-data-rows">
                    <label>Height:</label>
                    <span>{imageDimensions.height}</span>
                </div>
                <div className="file-data-rows">
                    <label>Rotate:</label>
                    <input
                        type="text"
                        value={rotationDegree}
                        onChange={(e) => {
                            if (onlyNumbers.test(e.target.value)) {
                                setRotationDegree(e.target.value);
                            }
                        }}
                    ></input>
                    <button className="small">Apply</button>
                </div>
            </div>


        </aside>
    );
}

export default Sidebar;
