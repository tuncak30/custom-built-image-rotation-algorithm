import './App.css';
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Canvas from "./Components/Canvas";
import {useRef, useState} from "react";

function App() {
    // We lift the state up to App.js in order to use between two siblings -> Sidebar.js and Canvas.js
    const [rotationDegree, setRotationDegree] = useState("");
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
                setRotationDegree={setRotationDegree}
                imageDimensions={imageDimensions}
                setUploadedImgSrc={setUploadedImgSrc}
            />
            <Canvas
                uploadedImgSrc={uploadedImgSrc}
                imgElement={imgElement}
                setImageDimensions={setImageDimensions}
                rotationDegree={rotationDegree}
            />
        </>
    );
}

export default App;
