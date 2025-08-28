import React from "react";
import type { ButtonProps } from "../types/button";

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={`bg-black text-white text-center px-4 py-2 rounded hover:bg-gray-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
