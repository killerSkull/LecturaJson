import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon: Icon,
    disabled,
    isLoading,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const variants = {
        primary: "bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20 border border-transparent",
        secondary: "bg-background-card hover:bg-[#2a2a2a] text-text-primary border border-white/10 hover:border-white/20",
        ghost: "bg-transparent hover:bg-white/5 text-text-secondary hover:text-text-primary",
        danger: "bg-error/10 hover:bg-error/20 text-error border border-error/20",
        success: "bg-success/10 hover:bg-success/20 text-success border border-success/20",
    };

    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : Icon && (
                <Icon size={size === 'sm' ? 14 : 18} />
            )}
            {children}
        </button>
    );
};

export default Button;
