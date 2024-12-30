// LoginButton.tsx
import React from 'react';
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {signIn} from "~/auth/clientAuth";

const LoginButton = () => {
  const clientContext = useClientContextState();
  return (
    <button style={{
      padding: '2px 0px',
      margin: "5px",
      fontSize: '1.2em',
      color: 'rgba(255, 255, 255, 0.8)',
      fontFamily: 'UDEVGothic, sans-serif',
      backgroundColor: 'transparent',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      borderRadius: '8px',
      cursor: 'pointer',
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
      textShadow: '2px 2px 8px rgba(0, 200, 255, 0.5)',
      width: "200px"
    }}
            onMouseOver={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = 'rgba(0, 200, 255, 0.2)';
              target.style.color = 'rgba(255, 255, 255, 1)';
              target.style.borderColor = 'rgba(0, 200, 255, 0.8)';
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = 'transparent';
              target.style.color = 'rgba(255, 255, 255, 0.8)';
              target.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            }}
            onClick={() => signIn(clientContext)}
    >
      Login
    </button>
  );
}

export default LoginButton;
