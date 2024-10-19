import "./overlay.css"

const overlay = () => {
    return (
        <div>
            <div className="overlay"></div> {/* 黒い枠のオーバーレイ */}
            <div className="cornerFrame topLeft"></div>
            <div className="cornerFrame topRight"></div>
            <div className="cornerFrame bottomLeft"></div>
            <div className="cornerFrame bottomRight"></div>
        </div>
    )
}
export default overlay;
