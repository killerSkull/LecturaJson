import React, { useState } from 'react';
import { Code2, LayoutGrid } from 'lucide-react';
import { clsx } from 'clsx';

const SplitView = ({ showEditor, setShowEditor, children }) => {
    const childrenArray = React.Children.toArray(children);
    const [editorPanel, previewPanel] = childrenArray;

    // Resize Logic
    const [editorWidth, setEditorWidth] = useState(40); // Default 40%
    const [isResizing, setIsResizing] = useState(false);
    const splitPaneRef = React.useRef(null);

    const startResizing = React.useCallback((e) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = React.useCallback((e) => {
        if (isResizing && splitPaneRef.current) {
            const splitPaneRect = splitPaneRef.current.getBoundingClientRect();
            const newEditorWidth = ((e.clientX - splitPaneRect.left) / splitPaneRect.width) * 100;

            // Constrain width between 20% and 80%
            if (newEditorWidth >= 20 && newEditorWidth <= 80) {
                setEditorWidth(newEditorWidth);
            }
        }
    }, [isResizing]);

    React.useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        }

        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing, resize, stopResizing]);

    return (
        <div className="flex-1 flex flex-col overflow-hidden relative select-none">
            {/* Mobile Tab Controls - Only visible on small screens */}
            <div className="md:hidden flex border-b border-white/5 bg-background-secondary">
                <button
                    onClick={() => setShowEditor(true)}
                    className={clsx(
                        "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                        showEditor ? "text-accent border-b-2 border-accent" : "text-text-secondary"
                    )}
                >
                    <Code2 size={16} /> JSON Input
                </button>
                <button
                    onClick={() => setShowEditor(false)}
                    className={clsx(
                        "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                        !showEditor ? "text-accent border-b-2 border-accent" : "text-text-secondary"
                    )}
                >
                    <LayoutGrid size={16} /> Preview
                </button>
            </div>

            {/* Content Area Wrapper - Ensures Tabs are not covered */}
            <div
                ref={splitPaneRef}
                className="flex-1 relative flex md:flex-row overflow-hidden w-full"
            >
                {/* Editor Panel */}
                <div
                    className={clsx(
                        "bg-background-secondary border-r border-white/5 flex flex-col transition-all duration-300 md:duration-0", // Removed duration on desktop for instant resize
                        "absolute inset-0 md:relative z-20 md:z-auto",
                        !showEditor && "translate-x-[-100%] md:translate-x-0 hidden md:flex",
                        showEditor && "translate-x-0 flex",
                        "w-full md:w-[var(--panel-width)]"
                    )}
                    style={{ '--panel-width': `${editorWidth}%` }}
                >
                    {editorPanel}
                </div>

                {/* Resizer Handle (Desktop Only) */}
                <div
                    className="hidden md:flex w-2 bg-background-tertiary hover:bg-accent cursor-col-resize items-center justify-center z-50 transition-colors"
                    onMouseDown={startResizing}
                >
                    <div className="w-1 h-8 bg-white/20 rounded-full" />
                </div>

                {/* Preview Panel */}
                <div
                    className={clsx(
                        "bg-background-primary flex flex-col transition-all duration-300 md:duration-0", // Removed duration on desktop
                        "absolute inset-0 md:relative z-10 md:z-auto",
                        showEditor && "translate-x-[100%] md:translate-x-0 hidden md:flex",
                        !showEditor && "translate-x-0 flex",
                        "w-full md:w-[var(--panel-width)]"
                    )}
                    style={{ '--panel-width': `${100 - editorWidth}%` }}
                >
                    {previewPanel}
                </div>
            </div>
        </div>
    );
};

export default SplitView;
