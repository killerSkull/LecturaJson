import React, { useState, useEffect } from 'react';
import { assetStore } from '../../utils/assetStore';
import Button from '../UI/Button';
import { Upload, X, Trash2, Copy, Image as ImageIcon } from 'lucide-react';
import { clsx } from 'clsx';

const AssetManager = ({ onClose }) => {
    const [assets, setAssets] = useState({});
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = () => {
        setAssets(assetStore.getAll());
    };

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError("Solo se permiten imágenes.");
            return;
        }

        setUploading(true);
        setError(null);
        try {
            const compressed = await assetStore.compress(file);
            // Use filename as base for ID for easier recognition
            const name = file.name.split('.')[0].replace(/[^a-z0-9]/gi, '-').toLowerCase();
            const id = `${name}-${Math.random().toString(36).substr(2, 5)}`;

            if (assetStore.save(id, compressed)) {
                loadAssets();
            } else {
                setError("Almacenamiento lleno. Borra algunas imágenes.");
            }
        } catch (err) {
            console.error(err);
            setError("Error al procesar la imagen.");
        } finally {
            setUploading(false);
            e.target.value = ''; // Reset input
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Borrar esta imagen?')) {
            assetStore.delete(id);
            loadAssets();
        }
    };

    const handleCopy = (id) => {
        navigator.clipboard.writeText(`asset://${id}`);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-background-card border border-white/10 rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <ImageIcon size={20} className="text-accent" />
                        Galería Local
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
                    {error && (
                        <div className="bg-error/10 border border-error/20 text-error px-4 py-2 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {/* Upload Card */}
                        <label className="aspect-square border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors group">
                            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                            <Upload size={24} className="text-text-secondary group-hover:text-accent" />
                            <span className="text-xs text-text-secondary font-medium">
                                {uploading ? 'Subiendo...' : 'Subir Imagen'}
                            </span>
                        </label>

                        {/* Asset Cards */}
                        {Object.entries(assets).map(([id, url]) => (
                            <div key={id} className="relative aspect-square group bg-black/20 rounded-lg overflow-hidden border border-white/5">
                                <img src={url} alt={id} className="w-full h-full object-cover" />

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                    <span className="text-[10px] text-white/70 truncate w-full text-center font-mono">
                                        {id}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleCopy(id)}
                                            className="p-1.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors"
                                            title="Copiar ID"
                                        >
                                            <Copy size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(id)}
                                            className="p-1.5 bg-error text-white rounded hover:bg-error/80 transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/5 text-xs text-text-secondary flex justify-between">
                    <span>Usa el ID copiado como <code>"image": "asset://id"</code></span>
                    <span>{Object.keys(assets).length} imágenes</span>
                </div>
            </div>
        </div>
    );
};

export default AssetManager;
