export const ASSET_STORAGE_KEY = 'json-viewer-assets';

// Helper to generate concise IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export const assetStore = {
    getAll: () => {
        try {
            return JSON.parse(localStorage.getItem(ASSET_STORAGE_KEY) || '{}');
        } catch {
            return {};
        }
    },

    save: (id, dataUrl) => {
        const assets = assetStore.getAll();
        assets[id] = dataUrl;
        try {
            localStorage.setItem(ASSET_STORAGE_KEY, JSON.stringify(assets));
            return true;
        } catch (e) {
            console.error("Storage full or error", e);
            return false;
        }
    },

    delete: (id) => {
        const assets = assetStore.getAll();
        delete assets[id];
        localStorage.setItem(ASSET_STORAGE_KEY, JSON.stringify(assets));
    },

    // Resolve asset://id to dataURL
    resolve: (url) => {
        if (!url || !url.startsWith('asset://')) return url;
        const id = url.replace('asset://', '');
        const assets = assetStore.getAll();
        return assets[id] || url; // Fallback to original if not found (e.g., broken link)
    },

    // Compression utility
    compress: (file, maxWidth = 800) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = (maxWidth * height) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG 0.7 for good balance
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
                img.onerror = (e) => reject(e);
            };
            reader.onerror = (e) => reject(e);
        });
    }
};
