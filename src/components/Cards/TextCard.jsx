import React from 'react';
import { AlignLeft } from 'lucide-react';

const TextCard = ({ item }) => {
    return (
        <div className="bg-background-card rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors hover:shadow-lg shadow-black/20 group animate-fade-in">
            {item.title && (
                <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {item.title}
                </h3>
            )}
            <p className="text-text-secondary text-sm leading-relaxed text-justify">
                {item.content || item.text || item.description}
            </p>
        </div>
    );
};

export default TextCard;
