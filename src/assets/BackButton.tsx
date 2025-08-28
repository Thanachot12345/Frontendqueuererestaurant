import React from "react";
import type { ButtonProps } from "../types/button";

const BackButton: React.FC<ButtonProps> = ({ children, className }) => { return(
    <button 
      className={`bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ${className}`}
      onClick={() => window.history.back()}>
        {children}
    </button>
); }
export default BackButton;