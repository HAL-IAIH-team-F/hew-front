import React from 'react';

export const Card = ({ 
  children, 
  className = "", 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div 
      className={`
        rounded-xl transition-all duration-300 
        h-full
        bg-gray-900
        hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/20
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ 
  children, 
  className = "", 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div 
      className={`
        p-6 pb-3
        dark:text-gray-100
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ 
  children, 
  className = "", 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div 
      className={`
        px-6 py-3
        dark:text-gray-300
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter = ({ 
  children, 
  className = "", 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div 
      className={`
        p-6 pt-3
        dark:text-gray-100
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const Button = ({ 
  children, 
  className = "", 
  variant = "default",
  disabled = false,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline"
}) => {
  const baseStyles = `
    inline-flex items-center justify-center 
    rounded-lg px-4 py-2 text-sm font-medium 
    transition-all duration-200 
    focus-visible:outline-none focus-visible:ring-2 
    focus-visible:ring-offset-2 
    disabled:pointer-events-none disabled:opacity-50
    transform hover:scale-105 active:scale-95
  `;
  
  const variantStyles = {
    default: `
      bg-gradient-to-r from-blue-600 to-blue-500 
      text-white 
      hover:from-blue-700 hover:to-blue-600
      dark:from-blue-500 dark:to-blue-400
      dark:hover:from-blue-600 dark:hover:to-blue-500
      focus-visible:ring-blue-500
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200 
      text-gray-900
      hover:from-gray-200 hover:to-gray-300
      dark:from-gray-700 dark:to-gray-600
      dark:text-gray-100
      dark:hover:from-gray-600 dark:hover:to-gray-500
      focus-visible:ring-gray-500
    `,
    outline: `
      border-2 border-blue-500 
      text-blue-500 
      hover:bg-blue-50
      dark:border-blue-400 
      dark:text-blue-400
      dark:hover:bg-blue-950
      focus-visible:ring-blue-400
    `
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Button
};