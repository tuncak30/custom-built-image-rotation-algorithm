function Canvas(props) {
    const {
        uploadedImgSrc,
        imgElement,
        setImageDimensions
    } = props;

    return (
        <img
            src={uploadedImgSrc}
            alt="Uploaded alt tag"
            ref={imgElement}
            onLoad={() => {
                setImageDimensions(prev => (
                    {
                        ...prev,
                        height: imgElement.current.naturalHeight,
                        width: imgElement.current.naturalWidth,
                    }
                ))
            }}
        />
    );
}

export default Canvas;
