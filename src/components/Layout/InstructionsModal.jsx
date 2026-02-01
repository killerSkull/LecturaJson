import React, { useState } from 'react';
import { X, Video, Image, Link2, List, Code, Type, FileJson, Info, Sparkles } from 'lucide-react';
import Button from '../UI/Button';
import { clsx } from 'clsx';

const CardType = ({ icon: Icon, type, description, snippet }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-background-primary rounded-xl p-5 border border-white/5 hover:border-accent/20 transition-colors group">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 text-accent">
                    <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                        <Icon size={20} />
                    </div>
                    <span className="font-mono font-bold text-sm tracking-wide bg-accent/5 px-2 py-0.5 rounded text-accent/90">{type}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="text-xs font-medium text-text-secondary hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors"
                >
                    {copied ? 'Copiado!' : 'Copiar JSON'}
                </button>
            </div>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed">{description}</p>
            <div className="relative group/code">
                <pre className="bg-black/40 p-3 rounded-lg text-xs font-mono text-text-secondary overflow-x-auto border border-white/5 select-all custom-scrollbar">
                    {snippet}
                </pre>
            </div>
        </div>
    );
};

const InstructionsModal = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('cards');

    const tabs = [
        { id: 'cards', label: 'Tipos de Tarjetas', icon: List },
        { id: 'features', label: 'Funciones Pro', icon: Sparkles },
        { id: 'tips', label: 'Tips & Trucos', icon: Info },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-background-secondary w-full max-w-4xl max-h-[90vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-background-secondary/95 backdrop-blur z-10 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-accent to-accent/50 p-3 rounded-xl shadow-lg shadow-accent/20 text-white">
                            <FileJson size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-text-primary">Guía de Referencia</h2>
                            <p className="text-sm text-text-secondary">Documentación completa de LecturaJson</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/5 rounded-full">
                        <X size={20} />
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/5 px-6 gap-6 bg-background-primary/30 shrink-0">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "flex items-center gap-2 py-4 text-sm font-medium transition-all relative",
                                activeTab === tab.id ? "text-accent" : "text-text-secondary hover:text-text-primary"
                            )}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t-full layout-id-tab-indicator" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-background-secondary">

                    {/* Cards Tab */}
                    {activeTab === 'cards' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                            <CardType
                                icon={Video}
                                type="video"
                                description="Tarjeta de video optimizada. Pega un link de YouTube y detectamos automáticamente la miniatura."
                                snippet={`{
  "type": "video",
  "title": "Tutorial Hytale",
  "videoUrl": "https://youtu.be/bneHpN5zHIo",
  "description": "Explorando las nuevas mecánicas...",
  "code": "GAMING"
}`}
                            />
                            <CardType
                                icon={Type}
                                type="mixed"
                                description="Tarjeta híbrida 'Master'. Soporta imágenes, tags, autor y descripción rica."
                                snippet={`{
  "type": "mixed",
  "title": "FeresDev Profile",
  "image": "https://feresdev.com/social-preview.jpg",
  "description": "Desarrollador Full Stack & Creator",
  "tags": ["DEV", "CEO"],
  "author": "@feres_Dev"
}`}
                            />
                            <CardType
                                icon={Code}
                                type="code"
                                description="Bloque de código con resaltado de sintaxis. Soporta JSON formateado automáticamente."
                                snippet={`{
  "type": "code",
  "language": "json",
  "content": {
    "config": "enabled",
    "version": 1.0
  }
}`}
                            />
                            <CardType
                                icon={List}
                                type="list"
                                description="Lista de características con estilo limpio."
                                snippet={`{
  "type": "list",
  "title": "Stack Tecnológico",
  "items": [
    "React 19",
    "TailwindCSS v4",
    "Vite"
  ]
}`}
                            />
                            <CardType
                                icon={Link2}
                                type="link"
                                description="Enlace externo visual con favicon automático."
                                snippet={`{
  "type": "link",
  "title": "Visitar Sitio Web",
  "url": "https://feresdev.com",
  "favicon": "https://feresdev.com/favicon.ico"
}`}
                            />
                            <CardType
                                icon={Image}
                                type="image"
                                description="Tarjeta puramente visual para galerías."
                                snippet={`{
  "type": "image",
  "url": "https://feresdev.com/assets/gallery-1.jpg"
}`}
                            />
                        </div>
                    )}

                    {/* Features Tab */}
                    {activeTab === 'features' && (
                        <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
                            <div className="bg-background-primary rounded-xl p-6 border border-white/5">
                                <h3 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
                                    <Sparkles size={20} />
                                    Relaxed JSON Parsing
                                </h3>
                                <p className="text-text-secondary mb-4">
                                    ¡Olvídate de escapar saltos de línea manualmente! Ahora puedes pegar texto multilínea directamente en tus strings JSON y nosotros lo arreglamos por ti.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <div className="text-xs font-bold text-red-400 mb-2">ANTES (Error)</div>
                                        <pre className="text-[10px] text-red-300 font-mono opacity-70">
                                            {`{ "text": "Linea 1
Linea 2" }`}
                                        </pre>
                                    </div>
                                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <div className="text-xs font-bold text-green-400 mb-2">AHORA (Funciona)</div>
                                        <pre className="text-[10px] text-green-300 font-mono">
                                            {`{ "text": "Linea 1\\nLinea 2" }`}
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-background-primary rounded-xl p-6 border border-white/5">
                                <h3 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
                                    <Code size={20} />
                                    JSON en Code Cards
                                </h3>
                                <p className="text-text-secondary mb-4">
                                    Las tarjetas de tipo <code>code</code> ahora detectan objetos JSON automáticamente.
                                </p>
                                <ul className="space-y-2 text-sm text-text-secondary">
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5" />
                                        <span>Si pasas un objeto en <code>content</code>, se formatea (pretty-print) automáticamente.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5" />
                                        <span>Usa <code>"language": "json"</code> para tener resaltado de sintaxis a todo color.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Tips Tab */}
                    {activeTab === 'tips' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                            <div className="bg-background-primary p-5 rounded-xl border border-white/5">
                                <h4 className="font-bold text-text-primary mb-2">Auto-Detección</h4>
                                <p className="text-sm text-text-secondary">
                                    No es obligatorio poner <code>"type"</code>. Si la app ve <code>videoUrl</code>, asume que es un video. Si ve <code>code</code>, asume que es código.
                                </p>
                            </div>
                            <div className="bg-background-primary p-5 rounded-xl border border-white/5">
                                <h4 className="font-bold text-text-primary mb-2">Lazy Loading</h4>
                                <p className="text-sm text-text-secondary">
                                    Todas las imágenes y videos usan carga diferida para que tu JSON cargue instantáneamente aunque tenga 100 elementos.
                                </p>
                            </div>
                            <div className="bg-background-primary p-5 rounded-xl border border-white/5">
                                <h4 className="font-bold text-text-primary mb-2">Deep Linking</h4>
                                <p className="text-sm text-text-secondary">
                                    Copia la URL de tu navegador para compartir tu JSON exacto. Todo el contenido se comprime en la URL.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 bg-background-secondary/50 flex justify-end shrink-0">
                    <Button variant="primary" onClick={onClose}>Entendido</Button>
                </div>
            </div>
        </div>
    );
};

export default InstructionsModal;
