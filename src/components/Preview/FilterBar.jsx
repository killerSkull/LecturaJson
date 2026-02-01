import React from 'react';
import { clsx } from 'clsx';

const FilterBar = ({ activeFilter, onFilterChange, counts }) => {
    const filters = [
        { id: 'all', label: 'Todos' },
        { id: 'video', label: 'Videos' },
        { id: 'image', label: 'Imágenes' },
        { id: 'mixed', label: 'Mixto' },
        { id: 'text', label: 'Texto' },
        { id: 'list', label: 'Listas' },
        { id: 'link', label: 'Links' },
        { id: 'code', label: 'Código' },
    ];

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={clsx(
                        "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                        activeFilter === filter.id
                            ? "bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                            : "bg-background-card text-text-secondary border-white/5 hover:border-white/20 hover:text-text-primary"
                    )}
                >
                    {filter.label}
                    {counts?.[filter.id] > 0 && (
                        <span className="ml-1.5 opacity-60 text-[10px]">{counts[filter.id]}</span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
