import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '../UI/Button';

const MAX_HEIGHT = 450; // A bit more generous than 400

const CollapsibleCardWrapper = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldCollapse, setShouldCollapse] = useState(false);
    const contentRef = useRef(null);

    // Use ResizeObserver to handle dynamic content (images loading, window resize)
    useEffect(() => {
        if (!contentRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target.scrollHeight > MAX_HEIGHT) {
                    setShouldCollapse(true);
                } else {
                    // Only unset if we are definitely small enough, 
                    // but be careful not to toggle if expanded state makes it tall? 
                    // No, scrollHeight is the full content height.
                    // If we are collapsed, scrollHeight might be constrained? 
                    // No, entry.contentRect.height is constrained, but we check scrollHeight if possible 
                    // or we check the unconstrained child? 
                    // Actually, if overflow is hidden, scrollHeight is still the full height.
                }
            }
        });

        observer.observe(contentRef.current);

        // Initial check
        if (contentRef.current.scrollHeight > MAX_HEIGHT) {
            setShouldCollapse(true);
        }

        return () => observer.disconnect();
    }, []);

    if (!shouldCollapse) {
        return <div ref={contentRef}>{children}</div>;
    }

    return (
        <div className="relative">
            <div
                ref={contentRef}
                className={clsx(
                    "transition-all duration-500 ease-in-out",
                    !isExpanded ? `max-h-[${MAX_HEIGHT}px] overflow-hidden rounded-b-xl` : "max-h-none"
                )}
                style={!isExpanded ? { maxHeight: `${MAX_HEIGHT}px` } : {}}
            >
                {children}
            </div>

            {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-card via-background-card/80 to-transparent pointer-events-none flex items-end justify-center pb-4 z-20 rounded-b-xl">
                    {/* Button needs pointer-events-auto to be clickable */}
                    <div className="pointer-events-auto animate-bounce-subtle">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="bg-black/60 text-white hover:bg-black/80 backdrop-blur border border-white/10 shadow-xl rounded-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(true);
                            }}
                        >
                            <ChevronDown size={14} className="mr-1" />
                            Ver más
                        </Button>
                    </div>
                </div>
            )}

            {isExpanded && (
                <div className="flex justify-center mt-2 animate-fade-in">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-text-secondary hover:text-white bg-white/5 hover:bg-white/10 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(false);
                            // Optional: scroll back to top of card?
                        }}
                    >
                        <ChevronUp size={14} className="mr-1" />
                        Ver menos
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CollapsibleCardWrapper;
