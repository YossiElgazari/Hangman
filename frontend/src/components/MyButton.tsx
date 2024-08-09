import React, { forwardRef } from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
  dataTestId?: string;
  isLoading?: boolean;
};

// Define CSS classes for different button sizes
const sizeClasses = {
  small: "text-sm px-4 py-2 border w-22 lg:w-32",
  medium: "text-md px-6 py-3 border w-full w-[150px] lg:w-[200px]",
  large: "text-lg px-8 py-4 border-2 w-full w-[210px] sm:w-[250px] md:w-[300px] lg:px-10 lg:py-6 lg:text-2xl",
};

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, children, className = "", size = "medium", dataTestId, isLoading = false }, ref) => {
    return (
      <button
        ref={ref} // Forwarded ref to the button element
        onClick={onClick}
        className={`bg-primary text-slate-500 border-2 border-secondary50 ${
          isLoading ? "" : "hover:bg-secondary50 hover:text-primary hover:border-secondary50 dark:hover:bg-secondary_dark50 dark:hover:text-primary_dark dark:hover:border-secondary_dark50 hover:scale-105"
        } dark:bg-primary_dark dark:text-secondary_dark50 dark:border-secondary_dark50 transition-all duration-300 rounded-xl ${sizeClasses[size]} ${className} `}
        data-testid={dataTestId}  
        disabled={isLoading} // Disable the button when loading
      >
        {isLoading ? (
          <span className="flex justify-center items-center text-gray-500">
          <svg
            className="animate-spin h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-85"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4z"
            ></path>
          </svg>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

export default MyButton;
