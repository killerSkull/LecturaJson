import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

const JsonTreeNode = ({ label, value, isLast, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [copied, setCopied] = useState(false);

    const isObject = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);
    const isEmpty = isObject && Object.keys(value).length === 0;

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(JSON.stringify(value, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleExpand = (e) => {
        e.stopPropagation();
        if (!isEmpty) setIsExpanded(!isExpanded);
    };

    // Determine type for syntax highlighting
    const getType = (val) => {
        if (val === null) return 'null';
        if (Array.isArray(val)) return 'array';
        return typeof val;
    };

    const type = getType(value);

    // Render logic for different types
    const renderValue = (val) => {
        const valType = getType(val);
        switch (valType) {
            case 'string':
                return <span className="text-green-400">"{val}"</span>;
            case 'number':
                return <span className="text-orange-400">{val}</span>;
            case 'boolean':
                return <span className="text-blue-400">{val ? 'true' : 'false'}</span>;
            case 'null':
                return <span className="text-gray-500">null</span>;
            default:
                return <span className="text-text-primary">{String(val)}</span>;
        }
    };

    return (
        <div className="font-mono text-sm leading-6" style={{ paddingLeft: level > 0 ? '1.5rem' : 0 }}>
            <div
                className={clsx(
                    "flex items-start group hover:bg-white/5 rounded px-1 -ml-1 cursor-pointer select-text",
                    isEmpty && "cursor-default"
                )}
                onClick={isObject ? toggleExpand : undefined}
            >
                {/* Expander Icon */}
                <div className="w-5 h-6 flex items-center justify-center shrink-0 text-text-secondary">
                    {isObject && !isEmpty && (
                        isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    )}
                </div>

                {/* Key (if exists) */}
                {label && (
                    <span className="text-purple-400 mr-1">
                        "{label}":
                    </span>
                )}

                {/* Value or Start Bracket */}
                <div className="flex-1 flex items-center gap-2">
                    {isObject ? (
                        <span className="text-text-secondary">
                            {isArray ? '[' : '{'}
                            {!isExpanded && (
                                <span className="text-text-secondary mx-1 opacity-50">
                                    {isArray ? `... ${value.length} items` : `... ${Object.keys(value).length} keys`}
                                </span>
                            )}
                            {!isExpanded && (isArray ? ']' : '}')}
                        </span>
                    ) : (
                        renderValue(value)
                    )}

                    {!isLast && !isExpanded && <span className="text-text-secondary">,</span>}

                    {/* Hover Actions */}
                    <button
                        onClick={handleCopy}
                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-1 hover:bg-white/10 rounded text-text-secondary hover:text-white"
                        title="Copy value"
                    >
                        {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    </button>
                </div>
            </div>

            {/* Children */}
            {isObject && isExpanded && !isEmpty && (
                <div>
                    {Object.entries(value).map(([key, val], index, arr) => (
                        <JsonTreeNode
                            key={key}
                            label={isArray ? null : key}
                            value={val}
                            isLast={index === arr.length - 1}
                            level={level + 1}
                        />
                    ))}
                    <div className="pl-5 text-text-secondary">
                        {isArray ? ']' : '}'}{!isLast && ','}
                    </div>
                </div>
            )}
        </div>
    );
};

const JsonTreeView = ({ data }) => {
    return (
        <div className="w-full overflow-auto p-4 bg-background-secondary/50 rounded-lg border border-white/5">
            {Array.isArray(data) ? (
                data.map((item, index) => (
                    <JsonTreeNode
                        key={index}
                        label={null}
                        value={item}
                        isLast={index === data.length - 1}
                    />
                ))
            ) : (
                <JsonTreeNode
                    label={null}
                    value={data}
                    isLast={true}
                />
            )}
        </div>
    );
};

export default JsonTreeView;
