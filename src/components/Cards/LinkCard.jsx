import React from 'react';
import { ExternalLink, Link2 } from 'lucide-react';

import { assetStore } from '../../utils/assetStore';

const LinkCard = ({ item }) => {
    const getDomain = (url) => {
        try {
            return new URL(url).hostname;
        } catch {
            return url;
        }
    };

    const resolvedFavicon = assetStore.resolve(item.favicon);

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-background-card rounded-xl border border-white/5 p-4 hover:border-accent/50 hover:bg-accent/5 hover:-translate-y-0.5 transition-all duration-300 group animate-fade-in"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-background-secondary flex items-center justify-center shrink-0 border border-white/5 group-hover:border-accent/20 transition-colors">
                    {item.favicon ? (
                        <img src={resolvedFavicon} alt="" className="w-5 h-5" />
                    ) : (
                        <Link2 size={20} className="text-text-secondary group-hover:text-accent" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-text-primary truncate group-hover:text-accent transition-colors">
                        {item.title || item.url}
                    </h3>
                    <p className="text-xs text-text-secondary truncate flex items-center gap-1">
                        {getDomain(item.url)}
                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                </div>
            </div>
        </a>
    );
};

export default LinkCard;
