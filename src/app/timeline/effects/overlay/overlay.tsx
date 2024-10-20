import "./overlay.css"

const overlay = () => {
    return (
        <div>
            <div className="overlay"></div>
            <div className="cornerFrame topLeft"></div>
            <div className="cornerFrame topRight"></div>
            <div className="cornerFrame bottomLeft"></div>
            <div className="cornerFrame bottomRight"></div>
        </div>
    )
}
export default overlay;
