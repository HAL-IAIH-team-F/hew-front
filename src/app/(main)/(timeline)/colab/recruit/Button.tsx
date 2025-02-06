import React from "react";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

const buttonStyle: React.CSSProperties = {
    display: "block",
    textAlign: "center",
    verticalAlign: "middle",
    textDecoration: "none",
    width: "70px",
    margin: "auto",
    padding: "0.5rem 0rem",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "relative",
    transition: "0.3s ease-in-out",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "20px",
};

const disabledStyle: React.CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    cursor: "not-allowed",
    opacity: 0.5,
};

const buttonCSS = `
    .custom-button:hover {
        background: #fff;
        color: rgba(0, 0, 0, 0.5);
    }

    .custom-button:disabled {
        background: rgba(0, 0, 0, 0.3);
        color: gray;
        cursor: not-allowed;
    }
`;

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
    return (
        <>
            <style>{buttonCSS}</style>
            <button
                onClick={!disabled ? onClick : undefined}
                className="custom-button"
                style={{ ...buttonStyle, ...(disabled ? disabledStyle : {}) }}
                disabled={disabled}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
