import React from 'react';

const GenericCard = ({ item }) => {
    return (
        <div className="bg-background-card rounded-xl border border-white/5 p-4 overflow-hidden hover:border-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary opacity-50">Raw JSON</span>
            </div>
            <pre className="text-xs font-mono text-text-secondary overflow-auto max-h-40 bg-black/20 p-2 rounded">
                {JSON.stringify(item, null, 2)}
            </pre>
        </div>
    );
};

export default GenericCard;
