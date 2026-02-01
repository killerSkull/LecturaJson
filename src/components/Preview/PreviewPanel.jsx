import React, { useState, useMemo } from 'react';
import { Search, Grid, List as ListIcon, Info, Network } from 'lucide-react';
import CardRenderer from '../Cards/CardRenderer';
import JsonTreeView from './JsonTreeView';
import FilterBar from './FilterBar';
import { detectType } from '../../utils/detectType';
import { clsx } from 'clsx';
import Button from '../UI/Button';

const PreviewPanel = ({ data, stats }) => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [cardSize, setCardSize] = useState(300); // Default card width in px

    // Extract items array from varying JSON structures
    const items = useMemo(() => {
        if (!data) return [];
        if (Array.isArray(data)) return data;

        // Heuristics for common wrapper keys - strictly check for arrays
        const potentialArrays = [data.items, data.content, data.posts, data.data];
        const foundArray = potentialArrays.find(arr => Array.isArray(arr));

        if (foundArray) return foundArray;

        // Last resort: treat object as single item
        return [data];
    }, [data]);

    // Derived state: Filtered items
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            // Free text search
            const matchesSearch = !search || JSON.stringify(item).toLowerCase().includes(search.toLowerCase());

            // Type filter
            if (filter === 'all') return matchesSearch;
            const type = detectType(item);
            const matchesFilter = type === filter;

            return matchesSearch && matchesFilter;
        });
    }, [items, search, filter]);

    // Derived state: Type counts for filter badges
    const typeCounts = useMemo(() => {
        const counts = {};
        items.forEach(item => {
            const type = detectType(item);
            counts[type] = (counts[type] || 0) + 1;
        });
        return counts;
    }, [items]);

    if (!items.length) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-text-secondary opacity-50 p-8 text-center">
                <Info size={48} className="mb-4 text-accent/50" />
                <p className="text-lg font-medium mb-2">Esperando contenido</p>
                <p className="text-sm max-w-xs">Escribe un JSON válido o arrastra un archivo para ver la magia.</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-background-primary">
            {/* Toolbar */}
            <div className="p-4 border-b border-white/5 sticky top-0 bg-background-primary/95 backdrop-blur z-20">
                <div className="flex flex-wrap gap-4 mb-4 items-center">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar contenido..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-background-secondary border border-white/5 rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent/50 transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-2 bg-background-secondary rounded-lg px-2 py-1 border border-white/5">
                        <span className="text-[10px] uppercase font-bold text-text-secondary">Size</span>
                        <input
                            type="range"
                            min="200"
                            max="600"
                            value={cardSize}
                            onChange={(e) => setCardSize(Number(e.target.value))}
                            className="w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full"
                        />
                    </div>

                    <div className="flex bg-background-secondary rounded-lg p-1 border border-white/5">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={clsx(
                                "p-1.5 rounded transition-all",
                                viewMode === 'grid' ? "bg-background-card text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"
                            )}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={clsx(
                                "p-1.5 rounded transition-all",
                                viewMode === 'list' ? "bg-background-card text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"
                            )}
                        >
                            <ListIcon size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('tree')}
                            className={clsx(
                                "p-1.5 rounded transition-all",
                                viewMode === 'tree' ? "bg-background-card text-accent shadow-sm" : "text-text-secondary hover:text-text-primary"
                            )}
                            title="Tree View"
                        >
                            <Network size={18} />
                        </button>
                    </div>
                </div>

                <FilterBar
                    activeFilter={filter}
                    onFilterChange={setFilter}
                    counts={typeCounts}
                />
            </div>

            {/* Content Grid */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
                <div
                    className={clsx(
                        viewMode === 'tree' ? "block" : "grid gap-4 md:gap-6 pb-20",
                        viewMode === 'list' && "grid-cols-1 max-w-3xl mx-auto"
                    )}
                    style={viewMode === 'grid' ? {
                        gridTemplateColumns: `repeat(auto-fill, minmax(${cardSize}px, 1fr))`
                    } : {}}
                >
                    {viewMode === 'tree' ? (
                        <JsonTreeView data={filteredItems} />
                    ) : (
                        filteredItems.map((item, idx) => (
                            <CardRenderer key={idx} item={item} />
                        ))
                    )}

                    {filteredItems.length === 0 && (
                        <div className="col-span-full text-center py-20 text-text-secondary">
                            No se encontraron resultados para tu búsqueda.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewPanel;
