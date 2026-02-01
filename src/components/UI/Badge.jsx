import React from 'react';
import { clsx } from 'clsx';

const Badge = ({ children, type = 'default' }) => {
    const getColors = (text) => {
        const t = text?.toUpperCase() || '';
        if (t === 'VIDEO') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        if (t === 'GAMING') return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
        if (t === 'TUTORIAL') return 'bg-green-500/10 text-green-400 border-green-500/20';
        if (t === 'NEWS') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        return 'bg-white/5 text-text-secondary border-white/10';
    };

    const colors = getColors(typeof children === 'string' ? children : type);

    return (
        <span className={clsx(
            "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border",
            colors
        )}>
            {children}
        </span>
    );
};

export default Badge;
