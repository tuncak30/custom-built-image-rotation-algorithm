// Create a custom hook to listen windowResize event so that we can resize our canvas element

import {useState,useEffect} from "react";

function useWindowResize(){
    const [windowSize, setWindowSize] = useState([window.innerHeight, window.innerWidth]);
    useEffect(() => {
        function handleResize(){
            setWindowSize([window.innerHeight, window.innerWidth]);
        }
        window.addEventListener("resize", handleResize);
        return() => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])
    return windowSize;
}

export default useWindowResize;