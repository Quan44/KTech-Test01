import React from "react";

interface ButtonProps {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
    variant?: "primary" | "outline" | "black";
    className?: string;
    [key: string]: any;
}

export const Button = ({
    leftIcon,
    rightIcon,
    children,
    variant = "primary",
    className = "",
    ...rest
}: ButtonProps) => {
    const baseStyle = "btn flex items-center gap-2 rounded-full px-5 py-3 font-xl";

    const variants: Record<string, string> = {
        primary: "bg-black text-white hover:bg-gray-900",
        outline: "border border-black text-black hover:bg-gray-100",
        black: "bg-black text-white hover:bg-gray-900",
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...rest}
        >
            {leftIcon && <span className="flex items-center">{leftIcon}</span>}
            <span className="flex-1 text-center">{children}</span>
            {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </button>
    );
};
