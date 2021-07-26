import {onlyNumbersAndDash} from "../Utils";
import {useState} from "react";

function Sidebar(props) {
    const {
        setRotationDegree,
        selectedFile,
        setSelectedFile,
        imageDimensions,
        setUploadedImgSrc,
        sidebarOpened,
        setSidebarOpened
    } = props;

    const [inputDegree, setInputDegree] = useState("");

    return (
        <aside id="sidebar" opened={sidebarOpened.toString()}>
            <div id="file-input-container">
                <button className="big file-upload-button">Upload Image
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                            if(e.target.files[0]){
                                setUploadedImgSrc(URL.createObjectURL(e.target.files[0]));
                                setRotationDegree("");
                                setInputDegree("");
                                setSidebarOpened('false');
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
                        value={inputDegree}
                        onChange={(e) => {
                            if (onlyNumbersAndDash.test(e.target.value)) {
                                setInputDegree(e.target.value);
                            }
                        }}
                    />
                    <button onClick={()=> {
                        setSidebarOpened('false');
                        setRotationDegree(inputDegree);
                    }} className="small">Apply</button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
