import React from 'react';
import Badge from '../UI/Badge';
import { Play } from 'lucide-react';

import { assetStore } from '../../utils/assetStore';

const VideoCard = ({ item }) => {
    const handlePlay = () => {
        if (item.videoUrl) {
            window.open(item.videoUrl, '_blank');
        }
    };

    const getYouTubeThumbnail = (url) => {
        if (!url) return null;
        // Supports: force-ipv4, youtu.be, youtube.com/watch?v=
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
        return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
    };

    const resolvedThumbnail = React.useMemo(() => {
        const explicitImage = item.thumbnail || item.image;
        if (explicitImage) {
            return assetStore.resolve(explicitImage);
        }
        // Fallback: Try to generate from video URL
        return getYouTubeThumbnail(item.videoUrl) || "https://placehold.co/600x400/1a1a1a/FFF?text=No+Thumbnail";
    }, [item.thumbnail, item.image, item.videoUrl]);

    return (
        <div
            onClick={handlePlay}
            className="bg-background-card rounded-xl border border-white/5 overflow-hidden hover:border-accent/30 cursor-pointer group animate-fade-in transition-all duration-300"
        >
            <div className="relative aspect-video w-full bg-black/40">
                <img
                    src={resolvedThumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-accent/90 rounded-full flex items-center justify-center pl-1 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300">
                        <Play fill="white" size={20} className="text-white" />
                    </div>
                </div>

                {/* Duration Badge */}
                {item.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-bold text-white tracking-wide">
                        {item.duration}
                    </div>
                )}
            </div>

            <div className="p-4">
                {item.tags && (
                    <div className="flex gap-2 mb-2">
                        {item.tags.map((tag, i) => <Badge key={i}>{tag}</Badge>)}
                    </div>
                )}
                <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                    {item.title}
                </h3>
                {item.description && (
                    <p className="text-sm text-text-secondary mt-2 line-clamp-3">
                        {item.description}
                    </p>
                )}
                {item.date && (
                    <div className="flex items-center gap-2 mt-2">
                        <div className="text-xs text-text-secondary opacity-60">
                            {item.date}
                        </div>
                        {item.code && (
                            <div className="text-xs font-medium text-accent opacity-90">
                                • {item.code}
                            </div>
                        )}
                    </div>
                )}
                {!item.date && item.code && (
                    <div className="text-xs font-medium text-accent mt-2 opacity-90">
                        {item.code}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoCard;
