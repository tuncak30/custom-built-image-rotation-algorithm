import './App.css';
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Canvas from "./Components/Canvas";
import {useRef, useState} from "react";

function App() {
    const [rotationDegree, setRotationDegree] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({width: "-", height: "-"});
    const [uploadedImgSrc, setUploadedImgSrc]  = useState(null);
    const imgElement = useRef(null);
    const [deg, setRotationDeg] = useState("");
    return (
        <>
            <Header />
            <Sidebar
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                rotationDegree={rotationDegree}
                setRotationDegree={setRotationDegree}
                imageDimensions={imageDimensions}
                setUploadedImgSrc={setUploadedImgSrc}
                doRotate={(deg) => setRotationDeg(deg)}
            />
            <Canvas
                uploadedImgSrc={uploadedImgSrc}
                imgElement={imgElement}
                setImageDimensions={setImageDimensions}
                deg={deg}
            />
        </>
    );
}

export default App;
