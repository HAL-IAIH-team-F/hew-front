import "./overlay.css";

const Overlay = () => {
    const depth = 500
    return (
        <div className="overlay">
            <div className="depthContainer">
                <div className="depthMeter">
                    <div className="depthBar" style={{ height: `${depth / 10}%` }}></div>
                </div>
                <div className="depthText">{`Depth: ${depth}m`}</div>
            </div>
            <div className="cornerLine lineTop"></div>
            <div className="cornerLine lineBottom"></div>
            <div className="cornerLine lineLeft"></div>
            <div className="cornerLine lineRight"></div>

            <div className="cornerDetails topLeft"></div>
            <div className="cornerDetails topRight"></div>
            <div className="cornerDetails bottomLeft"></div>
            <div className="cornerDetails bottomRight"></div>

            <div className="grid"></div>

            <div className="infoText">
                XXXXXXXXXXXX XXXXXX<br/>
                XXXXXXXX <br/>
                XXXXX XXXXXXXX
            </div>
        </div>
    );
}

export default Overlay;
