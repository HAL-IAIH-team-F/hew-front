// Title.tsx
import React, { useEffect, useState } from 'react';

const Title = () => {
    const [fontSize, setFontSize] = useState('8em');

    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setFontSize('4em'); 
        } else if (window.innerWidth <= 1024) {
            setFontSize('6em'); 
        } else {
            setFontSize('8em'); 
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <h1 style={{
            textAlign: "center",
            fontSize: fontSize,
            fontWeight: 'bold',
            letterSpacing: '0.15em',
            marginBottom: '0.2em',
            fontFamily: 'UDEVGothic, sans-serif',
        }}>
            <span style={{
                color: 'white',
                textShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3)',
            }}>D</span>
            <span style={{
                color: 'white',
                position: 'relative',
                textShadow: '0 0 8px rgba(240, 248, 255, 0.5), 0 0 20px rgba(240, 248, 255, 0.5)',
            }}>i</span>
            <span style={{
                color: 'white',
                textShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3)',
            }}>V</span>
            <span style={{
                color: 'white',
                textShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3)',
            }}>E</span>
            <span style={{
                color: 'white',
                textShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3)',
            }}>R</span>
        </h1>
    );
}

export default Title;
