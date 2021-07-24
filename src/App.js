import './App.css';
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Canvas from "./Components/Canvas";
import {useRef, useState} from "react";
import {onlyNumbers} from "./Utils";

function App() {
    const [rotationDegree, setRotationDegree] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({width: "-", height: "-"});
    const [uploadedImgSrc, setUploadedImgSrc]  = useState(null);
    const imgElement = useRef(null);

    return (
        <>
            <Header />
            <Sidebar
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                rotationDegree={rotationDegree}
                setRotationDegree={(e) => {
                    if (onlyNumbers.test(e.target.value)) {
                        setRotationDegree(e.target.value);
                    }
                }}
                imageDimensions={imageDimensions}
                setUploadedImgSrc={setUploadedImgSrc}
            />
            <Canvas
                uploadedImgSrc={uploadedImgSrc}
                imgElement={imgElement}
                setImageDimensions={setImageDimensions}

            />
        </>
    );
}

export default App;
