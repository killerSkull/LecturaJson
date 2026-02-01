import { useState, useCallback, useMemo, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'json-viewer-content';

export const useJsonParser = () => {
    const [rawText, setRawText] = useState(() => {
        return localStorage.getItem(LOCAL_STORAGE_KEY) || '';
    });
    const [parsedData, setParsedData] = useState(null);
    const [error, setError] = useState(null);

    // Persist to LocalStorage whenever rawText changes
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, rawText);
    }, [rawText]);

    const stats = useMemo(() => {
        if (!parsedData) return { count: 0, types: {} };

        const items = Array.isArray(parsedData)
            ? parsedData
            : (parsedData.content || parsedData.items || parsedData.posts || []); // Heuristic for common lists

        if (!Array.isArray(items)) return { count: 1, types: {} };

        return {
            count: items.length,
            types: {} // Could compute type distribution here if needed
        };
    }, [parsedData]);

    const parseJson = useCallback((text) => {
        try {
            if (!text || !text.trim()) {
                setParsedData(null);
                setError(null);
                return;
            }
            const parsed = JSON.parse(text);
            setParsedData(parsed);
            setError(null);
        } catch (err) {
            // Attempt "Relaxed" Parsing for multi-line strings
            try {
                // Regex to match double-quoted strings that might span lines
                // Uses 's' flag so . matches newlines, preventing correct parsing initially but allowing us to fix it
                // We're looking for content between quotes that aren't escaped
                const sanitized = text.replace(/"((?:[^"\\]|\\.)*)"/sg, (match) => {
                    // Replace actual newlines with escaped newline literals
                    return match.replace(/\n/g, '\\n').replace(/\r/g, '');
                });

                if (sanitized !== text) {
                    const parsedRelaxes = JSON.parse(sanitized);
                    setParsedData(parsedRelaxes);
                    setError(null);
                    return; // Success with relaxed parsing
                }
            } catch (retryErr) {
                // Ignore retry error and show original error
            }

            // Extract line number if possible (V8/Chrome mostly)
            const match = err.message.match(/at position (\d+)/);
            let line = null;
            if (match) {
                // Very rough estimation of line number
                const position = parseInt(match[1], 10);
                line = text.substring(0, position).split('\n').length;
            }

            setError({
                message: err.message,
                line: line
            });
            setParsedData(null);
        }
    }, []);

    // Initial parse effect if refreshing with data in localStorage
    useEffect(() => {
        if (rawText && !parsedData) {
            parseJson(rawText);
        }
    }, []); // Run once on mount

    const handleTextChange = useCallback((text) => {
        setRawText(text);
        parseJson(text);
    }, [parseJson]);

    const setJson = useCallback((data) => {
        const text = JSON.stringify(data, null, 2);
        setRawText(text);
        setParsedData(data);
        setError(null);
    }, []);

    const clear = useCallback(() => {
        setRawText('');
        setParsedData(null);
        setError(null);
    }, []);

    return {
        rawText,
        parsedData,
        error,
        stats,
        handleTextChange,
        setJson, // For drag & drop or example loading
        clear
    };
};
