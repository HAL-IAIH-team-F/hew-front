import React from "react";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

const buttonCSS = `
    .custom-button {
        display: block;
        text-align: center;
        vertical-align: middle;
        text-decoration: none;
        width: 70px;
        margin: auto;
        padding: 0.5rem 0rem;
        color: #fff;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.5);
        position: relative;
        transition: 0.3s ease-in-out;
        border: none;
        cursor: pointer;
        overflow: hidden;
        border-radius: 20px;
    }

    .custom-button:hover {
        background: #fff;
        color: rgba(0, 0, 0, 0.5);
    }

    .custom-button:disabled {
        background: rgba(0, 0, 0, 0.3);
        color: gray;
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
    return (
        <>
            <style>{buttonCSS}</style>
            <button
                onClick={!disabled ? onClick : undefined}
                className="custom-button"
                disabled={disabled}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
