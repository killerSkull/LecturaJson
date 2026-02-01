import { useState, useCallback, useEffect } from 'react';

const MAX_HISTORY = 5;
const STORAGE_KEY = 'json_editor_history';

export const useHistory = (currentJson) => {
    const [history, setHistory] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Save to history when json changes (debounced by effect in parent, 
    // but here we just need to provide a way to manual save or auto-save unique states)
    // Actually, deeper integration: whenever setJson is called, we might want to push?
    // Or simpler: Just expose "addToHistory" and let the Editor call it on significant changes?
    // Or: Use an effect here that watches `currentJson`.

    useEffect(() => {
        if (!currentJson) return;

        setHistory(prev => {
            // Avoid duplicates at the top of the stack
            const lastEntry = prev[0];
            if (JSON.stringify(lastEntry?.data) === JSON.stringify(currentJson)) {
                return prev;
            }

            const newEntry = {
                timestamp: Date.now(),
                data: currentJson,
                preview: JSON.stringify(currentJson).slice(0, 50) + '...'
            };

            const newHistory = [newEntry, ...prev].slice(0, MAX_HISTORY);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    }, [currentJson]); // This might be too aggressive if currentJson updates on every keystroke.
    // Ideally, currentJson passed here should be the "parsedData" (which is valid JSON) 
    // AND mostly stable. `parsedData` updates on every valid parse. 
    // We probably want to debounce this saving logic significantly (e.g., 3 seconds of stability).

    const clearHistory = useCallback(() => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return { history, clearHistory };
};
