import React from 'react';
import Badge from '../UI/Badge';
import { Calendar, User } from 'lucide-react';

import { assetStore } from '../../utils/assetStore';

const MixedCard = ({ item }) => {
    const resolvedImage = assetStore.resolve(item.image);

    return (
        <div className="bg-background-card rounded-xl border border-white/5 overflow-hidden hover:border-white/10 hover:shadow-lg transition-all duration-300 group animate-fade-in hover:-translate-y-1">
            {item.image && (
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={resolvedImage}
                        alt={item.title || 'Cover'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    {/* Overlay Code/Brand if exists */}
                    {item.code && (
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-white/90 border border-white/10">
                            {item.code}
                        </div>
                    )}
                </div>
            )}

            <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags?.map((tag, idx) => (
                        <Badge key={idx}>{tag}</Badge>
                    ))}
                </div>

                {item.title && (
                    <h3 className="text-xl font-bold text-text-primary mb-2 leading-snug group-hover:text-accent transition-colors">
                        {item.title}
                    </h3>
                )}

                <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                    {item.date && (
                        <div className="flex items-center gap-1.5 opacity-60">
                            <Calendar size={12} />
                            <span>{item.date}</span>
                        </div>
                    )}
                    {item.author && (
                        <div className="flex items-center gap-1.5 opacity-60">
                            <User size={12} />
                            <span>{item.author}</span>
                        </div>
                    )}
                </div>

                {item.description && (
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {item.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MixedCard;
