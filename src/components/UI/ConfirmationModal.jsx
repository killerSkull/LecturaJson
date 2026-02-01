import React from 'react';
import Button from './Button';
import { AlertCircle } from 'lucide-react';

const ConfirmationModal = ({ title, message, onConfirm, onCancel, confirmText = 'Confirmar', cancelText = 'Cancelar', variant = 'danger' }) => {
    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onCancel}>
            <div className="bg-background-secondary w-full max-w-sm rounded-xl border border-white/10 shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                        <AlertCircle size={32} />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-text-primary mb-1">{title}</h3>
                        <p className="text-sm text-text-secondary">{message}</p>
                    </div>

                    <div className="flex gap-3 w-full mt-2">
                        <Button variant="ghost" className="flex-1 justify-center" onClick={onCancel}>
                            {cancelText}
                        </Button>
                        <Button
                            variant="primary"
                            className={`flex-1 justify-center ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
