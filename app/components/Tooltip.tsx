"use client";
import { useState, ReactNode } from "react";

interface TooltipProps {
    children: ReactNode;
    message?: string;
    position?: "top" | "bottom" | "left" | "right";
    delay?: number;
    className?: string;
    disabled?: boolean;
}

const Tooltip = ({ 
    children, 
    message = "Press Enter to search after typing your search term",
    position = "top",
    delay = 200,
    className = "",
    disabled = false
}: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const showTooltip = () => {
        const id = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        setTimeoutId(id);
    };

    const hideTooltip = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setIsVisible(false);
    };

    const getPositionClasses = () => {
        switch (position) {
        case "top":
            return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
        case "bottom":
            return "top-full left-1/2 transform -translate-x-1/2 mt-2";
        case "left":
            return "right-full top-1/2 transform -translate-y-1/2 mr-2";
        case "right":
            return "left-full top-1/2 transform -translate-y-1/2 ml-2";
        default:
            return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
        }
    };

    const getArrowClasses = () => {
        switch (position) {
        case "top":
            return "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800";
        case "bottom":
            return "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-800";
        case "left":
            return "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-800";
        case "right":
            return "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-800";
        default:
            return "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800";
        }
    };

    return (
        <div 
            className={`relative inline-block ${className}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            
            {isVisible && !disabled && (
                <div
                    className={`absolute z-50 px-3 py-2 text-sm text-white bg-dark-300 rounded-md shadow-lg whitespace-nowrap ${getPositionClasses()}`}
                    role="tooltip"
                >
                    {message}
                    {/* Arrow */}
                    <div
                        className={`absolute w-0 h-0 border-4 ${getArrowClasses()}`}
                    />
                </div>
            )}
        </div>
    );
};

export default Tooltip;
