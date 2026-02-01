import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

import { assetStore } from '../../utils/assetStore';

const ImageCard = ({ item }) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const resolvedUrl = assetStore.resolve(item.url || item.src || item.image);

    return (
        <div className="bg-background-card rounded-xl border border-white/5 overflow-hidden hover:border-white/10 transition-transform hover:scale-[1.01] duration-300 animate-fade-in">
            <div className="relative aspect-video bg-background-secondary w-full">
                {loading && !error && (
                    <div className="absolute inset-0 animate-pulse bg-white/5" />
                )}

                {error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-text-secondary gap-2">
                        <ImageOff size={24} />
                        <span className="text-xs">Error loading image</span>
                    </div>
                ) : (
                    <img
                        src={resolvedUrl}
                        alt={item.alt || item.title || 'Content'}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                        loading="lazy"
                        onLoad={() => setLoading(false)}
                        onError={() => {
                            setError(true);
                            setLoading(false);
                        }}
                    />
                )}
            </div>
            {(item.title || item.alt) && (
                <div className="p-3">
                    <p className="text-sm font-medium text-text-primary truncate">{item.title || item.alt}</p>
                </div>
            )}
        </div>
    );
};

export default ImageCard;
