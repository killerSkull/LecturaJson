import React, { useState, useRef } from 'react';
import { clsx } from 'clsx';
import EditorControls from './EditorControls';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import './prism-theme.css'; // Custom styles

const JsonEditor = ({ rawText, onTextChange, error, onLoadTemplate, history }) => {
    const [isDragging, setIsDragging] = useState(false);
    const lineNumbersRef = useRef(null);
    const editorContainerRef = useRef(null);

    // Calculate line numbers
    const lineCount = rawText.split('\n').length;
    const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

    // Sync scroll
    const handleScroll = (e) => {
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = e.target.scrollTop;
        }
    };

    // Handlers for JSON manipulation
    const handleFormat = () => {
        try {
            const obj = JSON.parse(rawText);
            onTextChange(JSON.stringify(obj, null, 2));
        } catch (e) {
            // Ignore format error on invalid JSON
        }
    };

    const handleMinify = () => {
        try {
            const obj = JSON.parse(rawText);
            onTextChange(JSON.stringify(obj));
        } catch (e) {
            // Ignore
        }
    };

    const handleClear = () => onTextChange('');

    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => onTextChange(e.target.result);
        reader.readAsText(file);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(rawText);
    };

    // Drag and Drop
    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => setIsDragging(false);

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
            handleUpload(file);
        }
    };

    return (
        <div className="flex flex-col h-full bg-background-secondary text-sm relative transition-colors duration-300">
            <EditorControls
                onFormat={handleFormat}
                onMinify={handleMinify}
                onClear={handleClear}
                onUpload={handleUpload}
                onCopy={handleCopy}
                onLoadTemplate={onLoadTemplate}
                history={history}
            />

            <div className="relative flex-1 flex overflow-hidden group">
                {/* Dynamic Line Numbers */}
                <div
                    ref={lineNumbersRef}
                    className="w-12 bg-background-secondary border-r border-white/5 text-text-secondary/30 pt-4 text-right pr-2 select-none font-mono text-xs hidden sm:block overflow-hidden shrink-0"
                    style={{ paddingTop: '16px', lineHeight: '24px' }}
                >
                    {lines.map((num) => (
                        <div key={num} style={{ height: '24px' }}>{num}</div>
                    ))}
                </div>

                <div
                    ref={editorContainerRef}
                    onScroll={handleScroll}
                    className={clsx(
                        "w-full h-full overflow-auto scrollbar-thin prism-editor",
                        isDragging && "bg-accent/10 border-2 border-dashed border-accent m-2 rounded-lg"
                    )}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <Editor
                        value={rawText}
                        onValueChange={onTextChange}
                        highlight={code => highlight(code, languages.json)}
                        padding={16}
                        className="font-mono text-sm min-h-full"
                        textareaClassName="focus:outline-none"
                        style={{
                            fontFamily: '"Fira Code", "Fira Mono", monospace',
                            fontSize: 14,
                            lineHeight: '24px',
                            backgroundColor: 'transparent',
                            color: 'inherit'
                        }}
                    />
                </div>

                {/* Validation Status Indicator */}
                <div className={clsx(
                    "absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border shadow-lg transition-all pointer-events-none",
                    error
                        ? "bg-error/10 text-error border-error/20 translate-y-0 opacity-100"
                        : rawText.trim()
                            ? "bg-success/10 text-success border-success/20 translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                )}>
                    {error ? `Invalid JSON (Line ${error.line || '?'})` : 'Valid JSON'}
                </div>
            </div>
        </div>
    );
};

export default JsonEditor;
