import React, { useRef } from 'react';
import Button from '../UI/Button';
import { Upload, Copy, Trash2, AlignLeft, Minimize2, Check, Image as ImageIcon, LayoutTemplate } from 'lucide-react';
import AssetManager from './AssetManager';
import { TEMPLATES } from '../../utils/templates';

const EditorControls = ({ onFormat, onMinify, onClear, onUpload, onCopy, onLoadTemplate }) => {
    const fileInputRef = useRef(null);
    const [copied, setCopied] = React.useState(false);
    const [showAssets, setShowAssets] = React.useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
            e.target.value = ''; // Reset
        }
    };

    const handleCopy = () => {
        onCopy();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const handleTemplateSelect = (e) => {
        const templateName = e.target.value;
        if (templateName && TEMPLATES[templateName]) {
            onLoadTemplate(TEMPLATES[templateName]);
            e.target.value = ""; // Reset selection
        }
    };

    return (
        <>
            <div className="flex flex-wrap items-center gap-2 p-4 border-b border-white/5 bg-background-secondary sticky top-0 z-10">
                <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {/* Templates Dropdown */}
                <div className="relative group">
                    <Button variant="ghost" size="sm" icon={LayoutTemplate} className="pr-8">
                        Templates
                    </Button>
                    <select
                        onChange={handleTemplateSelect}
                        className="absolute inset-0 opacity-0 cursor-pointer text-sm"
                        defaultValue=""
                    >
                        <option value="" disabled className="bg-background-secondary text-text-primary">Select Template...</option>
                        {Object.keys(TEMPLATES).map(name => (
                            <option key={name} value={name} className="bg-background-secondary text-text-primary hover:bg-white/10">
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="h-6 w-px bg-white/10 mx-2" />

                <Button
                    variant="primary"
                    size="sm"
                    icon={Upload}
                    onClick={() => fileInputRef.current?.click()}
                >
                    Subir JSON
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    icon={ImageIcon}
                    onClick={() => setShowAssets(true)}
                    className="text-accent hover:text-accent-hover"
                >
                    Imágenes
                </Button>

                <div className="h-6 w-px bg-white/10 mx-2" />

                <Button variant="ghost" size="sm" icon={AlignLeft} onClick={onFormat} title="Formatear">
                    Formatear
                </Button>

                <Button variant="ghost" size="sm" icon={Minimize2} onClick={onMinify} title="Minificar">
                    Minificar
                </Button>

                <div className="flex-1" />

                <Button variant="ghost" size="sm" icon={copied ? Check : Copy} onClick={handleCopy} title="Copiar al portapapeles">
                    {copied ? 'Copiado' : 'Copiar'}
                </Button>

                <Button variant="ghost" size="sm" icon={Trash2} onClick={onClear} className="text-error hover:text-error/80" title="Limpiar">
                    Limpiar
                </Button>
            </div>

            {showAssets && <AssetManager onClose={() => setShowAssets(false)} />}
        </>
    );
};

export default EditorControls;
