import {useState} from "react";
import {onlyNumbers} from "../Utils";

function Sidebar() {

    const [rotationDegree, setRotationDegree] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <aside id="sidebar">
            <div id="file-input-container">
                <button className="big file-upload-button">Upload Image
                    <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => {
                            if(e.target.files[0]){
                                setSelectedFile(e.target.files[0].name);
                            }
                        }}
                    />
                </button>
            </div>
            <div id="file-data-container">
                <div className="file-data-rows">
                    <label>File:</label>
                    <span>{selectedFile}</span>
                </div>
                <div className="file-data-rows">
                    <label>Width:</label>
                    <span>-</span>
                </div>
                <div className="file-data-rows">
                    <label>Height:</label>
                    <span>-</span>
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
