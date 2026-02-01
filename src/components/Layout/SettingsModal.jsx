import React, { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import { createPortal } from 'react-dom';

const THEME_COLORS = [
    { name: 'Blue', value: '#3b82f6', hover: '#2563eb' },
    { name: 'Purple', value: '#8b5cf6', hover: '#7c3aed' },
    { name: 'Green', value: '#10b981', hover: '#059669' },
    { name: 'Orange', value: '#f97316', hover: '#ea580c' },
    { name: 'Pink', value: '#ec4899', hover: '#db2777' },
    { name: 'Red', value: '#ef4444', hover: '#dc2626' },
];

const SettingsModal = ({ onClose }) => {
    const [currentColor, setCurrentColor] = useState('#3b82f6');

    useEffect(() => {
        // Read current computed style provided by the global vars
        const savedColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
        if (savedColor) setCurrentColor(savedColor);
    }, []);

    const applyColor = (color) => {
        setCurrentColor(color.value);
        document.documentElement.style.setProperty('--color-accent', color.value);
        document.documentElement.style.setProperty('--color-accent-hover', color.hover);
        localStorage.setItem('theme_accent', color.value);
        localStorage.setItem('theme_accent_hover', color.hover);
    };

    return createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-background-secondary border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">

                {/* Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <h2 className="text-lg font-bold text-text-primary">Configuración</h2>
                    <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Color de Acento</h3>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {THEME_COLORS.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => applyColor(color)}
                                className="group relative flex flex-col items-center gap-2 p-2 rounded-xl transition-all hover:bg-white/5"
                            >
                                <div
                                    className="w-10 h-10 rounded-full shadow-lg border-2 border-transparent transition-transform group-hover:scale-110 flex items-center justify-center"
                                    style={{ backgroundColor: color.value, borderColor: currentColor === color.value ? 'white' : 'transparent' }}
                                >
                                    {currentColor === color.value && <Check size={16} className="text-white drop-shadow-md" />}
                                </div>
                                <span className="text-xs text-text-secondary group-hover:text-text-primary">{color.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-background-primary rounded-lg border border-white/5">
                        <p className="text-xs text-text-secondary text-center">
                            Más configuraciones vendrán pronto...
                        </p>
                    </div>
                </div>

                <div className="p-4 border-t border-white/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        Listo
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SettingsModal;
