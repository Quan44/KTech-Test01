import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
}

export const Input = ({
    leftIcon,
    rightIcon,
    className = "",
    ...props
}: InputProps) => {
    return (
        <div
            className={`flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-md border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 ${className}`}
        >
            {leftIcon && <span className="text-gray-500">{leftIcon}</span>}
            <input
            
                {...props}
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
            />
            {rightIcon && (
                <span className="text-gray-500">{rightIcon}</span>
            )}
        </div>
    );
};
