import React, { forwardRef } from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
  width?: string;
  dataTestId?: string;
};

// Define CSS classes for different button sizes
const sizeClasses = {
  small: "text-sm px-4 py-2 border",
  medium: "text-md px-8 py-4 border",
  large: "text-xl px-10 py-6 border-4",
};

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { onClick, children, className = "", size = "medium", width = "auto", dataTestId },
    ref
  ) => {
    return (
      <button
        ref={ref} // Forwarded ref to the button element
        onClick={onClick}
        className={`bg-primary text-slate-500 border-2 border-secondary50 hover:bg-secondary50 hover:text-primary hover:border-secondary50 dark:bg-primary_dark dark:text-secondary_dark50 dark:border-secondary_dark50 dark:hover:bg-secondary_dark50 dark:hover:text-primary_dark dark:hover:border-secondary_dark50 hover:scale-115 transition-all duration-300 font-outfit rounded-md  ${sizeClasses[size]} ${className}`}
        style={{ outline: "none", width }} // Apply custom width if provided
        data-testid={dataTestId}
      >
        {children}
      </button>
    );
  }
);

export default MyButton;
