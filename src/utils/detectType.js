/**
 * Detects the type of content for a given JSON item.
 * @param {Object} item - The JSON item to analyze
 * @returns {string} - The detected type: 'video', 'mixed', 'image', 'list', 'code', 'text', 'link', or 'generic'
 */
export const detectType = (item) => {
    if (!item || typeof item !== 'object') return 'text';

    if (item.type) return item.type;

    if (item.videoUrl || item.type === 'video') return 'video';
    if (item.image && item.description) return 'mixed';
    // Improved regex to catch capitalized extensions or query params if needed, mostly robust enough
    if (item.image || (item.url && item.url.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i))) return 'image';
    if (item.items && Array.isArray(item.items)) return 'list';
    if (item.code || item.language) return 'code';
    if (item.content || item.text || item.description) return 'text';
    if (item.url) return 'link';

    return 'generic';
};
