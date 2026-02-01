import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import Button from '../UI/Button';

const DownloadableCardWrapper = ({ children, fileName = 'card' }) => {
    const cardRef = useRef(null);
    const [isExporting, setIsExporting] = useState(false);

    const handleDownload = async (e) => {
        e.stopPropagation();
        if (!cardRef.current) return;

        setIsExporting(true);
        try {
            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                backgroundColor: null,
                pixelRatio: 2, // Retina quality
                filter: (node) => {
                    // Exclude the download button from the screenshot
                    return !node.classList?.contains('download-btn-exclude');
                },
                onClone: (clonedNode) => {
                    const images = clonedNode.querySelectorAll('img');
                    images.forEach(img => {
                        if (img.src && img.src.startsWith('http')) {
                            const urlNoProtocol = img.src.replace(/^https?:\/\//, '');
                            img.src = `https://images.weserv.nl/?url=${encodeURIComponent(urlNoProtocol)}&output=png`;
                            // Ensure CORS setting on the new image tag in the clone (though proxy generally handles it)
                            img.crossOrigin = 'anonymous';
                        }
                    });
                }
            });

            const link = document.createElement('a');
            link.download = `${fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Export failed", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="relative group" ref={cardRef}>
            {children}

            {/* Download Button - Visible on Hover */}
            <div className="download-btn-exclude absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownload}
                    className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm shadow-sm h-8 w-8 rounded-full"
                    title="Export as PNG"
                    disabled={isExporting}
                >
                    <Download size={14} className={isExporting ? "animate-bounce" : ""} />
                </Button>
            </div>
        </div>
    );
};

export default DownloadableCardWrapper;
