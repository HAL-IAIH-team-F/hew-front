"use client"
import "./overlay.css";
import { useEffect, useState } from "react";

const Overlay = () => {
    const [isTransparent, setTransparent] = useState(false);

    useEffect(() => {
        // コンポーネントがマウントされたら0.3秒後に透明化
        const timer = setTimeout(() => {
            setTransparent(true);
        }, 300);

        return () => clearTimeout(timer); // クリーンアップ
    }, []);

    return (
        <div className={`overlay ${isTransparent ? "transparent" : ""}`}
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'UDEVGothic, sans-serif',
                backgroundColor: "#00334d",
                background: 'linear-gradient(145deg, rgba(7, 7, 14, 0.1), rgba(0,0,40,0.95))',
                boxShadow: 'inset 0px 0px 50px rgba(0,0,0, 0.4)',
        }}>
            
        </div>
    );
};

export default Overlay;
