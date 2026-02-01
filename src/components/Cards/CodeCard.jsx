import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import '../Editor/prism-theme.css';

const CodeCard = ({ item }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textToCopy = typeof item.content === 'object'
            ? JSON.stringify(item.content, null, 2)
            : item.content;

        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formattedContent = React.useMemo(() => {
        if (typeof item.content === 'object' && item.content !== null) {
            return JSON.stringify(item.content, null, 2);
        }
        return item.content;
    }, [item.content]);

    const highlightedContent = React.useMemo(() => {
        const lang = item.language?.toLowerCase();
        if (lang === 'json' && languages.json) {
            return highlight(formattedContent, languages.json, 'json');
        }
        // Add more languages here if needed, or fallback to plain formatting
        return null;
    }, [formattedContent, item.language]);

    return (
        <div className="bg-background-card rounded-xl border border-white/5 overflow-hidden animate-fade-in text-left">
            <div className="bg-background-secondary px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-secondary">
                    <Terminal size={14} />
                    <span className="text-xs font-mono lowercase">{item.language || 'text'}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="text-text-secondary hover:text-white transition-colors"
                    title="Copy code"
                >
                    {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-text-primary leading-relaxed">
                    {highlightedContent ? (
                        <code dangerouslySetInnerHTML={{ __html: highlightedContent }} />
                    ) : (
                        <code>{formattedContent}</code>
                    )}
                </pre>
            </div>
        </div>
    );
};

export default CodeCard;
