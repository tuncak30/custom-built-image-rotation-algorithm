import {onlyNumbersAndDash} from "../Utils";

function Sidebar(props) {
    const {
        rotationDegree,
        setRotationDegree,
        selectedFile,
        setSelectedFile,
        imageDimensions,
        setUploadedImgSrc,
        doRotate
    } = props;

    return (
        <aside id="sidebar">
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
                    <span>{imageDimensions.width !== "-" ? `${imageDimensions.width} px` : '-'}</span>
                </div>
                <div className="file-data-rows">
                    <label>Height:</label>
                    <span>{imageDimensions.height !== "-" ? `${imageDimensions.height} px` : '-'}</span>
                </div>
                <div className="file-data-rows">
                    <label>Rotate:</label>
                    <input
                        type="text"
                        value={rotationDegree}
                        onChange={(e) => {
                            if (onlyNumbersAndDash.test(e.target.value)) {
                                setRotationDegree(e.target.value);
                            }
                        }}
                    />
                    <button onClick={()=> doRotate(rotationDegree)} className="small">Apply</button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
