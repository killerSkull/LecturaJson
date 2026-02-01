import { useEffect, useCallback } from 'react';
import LZString from 'lz-string';

export const useDeepLink = (setJson) => {
    // 1. On Mount: Check URL for data
    useEffect(() => {
        const hash = window.location.hash.slice(1); // Remove '#'
        if (hash.startsWith('data=')) {
            const compressed = hash.replace('data=', '');
            try {
                const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
                if (decompressed) {
                    const json = JSON.parse(decompressed);
                    setJson(json);
                }
            } catch (e) {
                console.error("Failed to parse deep link", e);
            }
        }
    }, [setJson]);

    // 2. Function to update URL
    // We use a debounce internally or expect the caller to debounce to avoid history spam
    const updateUrl = useCallback((data) => {
        if (!data) {
            window.location.hash = '';
            return;
        }

        try {
            const stringified = JSON.stringify(data);
            const compressed = LZString.compressToEncodedURIComponent(stringified);
            window.history.replaceState(null, '', `#data=${compressed}`);
        } catch (e) {
            console.error("Failed to compress data", e);
        }
    }, []);

    return { updateUrl };
};
