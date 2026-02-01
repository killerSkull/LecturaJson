import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import SplitView from './components/Layout/SplitView';
import JsonEditor from './components/Editor/JsonEditor';
import PreviewPanel from './components/Preview/PreviewPanel';
import { useJsonParser } from './hooks/useJsonParser';

import { useDeepLink } from './hooks/useDeepLink';
import ConfirmationModal from './components/UI/ConfirmationModal';
import { useHistory } from './hooks/useHistory';

// Sample data for initial load
const SAMPLE_DATA = {
  "posts": [
    {
      "title": "MIS AMIGOS LOS DINOS, Y POR QUÉ HUIR DE ELLOS 🏃💨",
      "date": "2026-01-26",
      "type": "video",
      "tags": ["VIDEO", "GAMING"],
      "image": "https://i9.ytimg.com/vi/bneHpN5zHIo/mqdefault.jpg?v=69782f94&sqp=CJjs48sG&rs=AOn4CLD8A67E-1qSUbGztOBxMuLT5V92SQ",
      "description": "Paseo por las zonas coloridas de Hytale pensando que habría paz. Grave error. Mis nuevos amigos los dinosaurios me dieron una bienvenida con mucho...",
      "code": "FeresDev",
      "videoUrl": "https://youtu.be/bneHpN5zHIo",
      "duration": "21:27"
    },
    {
      "type": "mixed",
      "title": "Welcome to JSON Viewer",
      "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
      "description": "This is a mixed content card that demonstrates how text and images work together. You can edit the JSON on the left to see changes instantly.",
      "tags": ["DEMO", "APP"],
      "author": "FeresDev"
    },
    {
      "type": "list",
      "title": "Features Implemented",
      "items": [
        "Real-time JSON parsing",
        "Automatic type detection",
        "Responsive Split View",
        "Dark Mode Theme",
        "Component Architecture"
      ]
    },
    {
      "type": "code",
      "language": "javascript",
      "content": "const great = true;\nif (great) {\n  console.log('It works!');\n}"
    },
    {
      "type": "link",
      "title": "FeresDev",
      "url": "https://feresdev.com",
      "favicon": "https://feresdev.com/favicon.ico"
    }
  ]
};

function App() {
  const [showEditor, setShowEditor] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const {
    rawText,
    parsedData,
    error,
    stats,
    handleTextChange,
    setJson
  } = useJsonParser();

  // Initialize History Hook
  const { history } = useHistory(parsedData);

  // Load sample data on mount ONLY if no hash exists AND no local storage
  useEffect(() => {
    const hasHash = !!window.location.hash;
    const hasLocal = !!localStorage.getItem('json-viewer-content');

    if (!hasHash && !hasLocal) {
      setJson(SAMPLE_DATA);
    }
  }, [setJson]);

  // Deep Link Integration
  const { updateUrl } = useDeepLink(setJson);

  // Sync valid data to URL
  useEffect(() => {
    if (parsedData) {
      const timeoutId = setTimeout(() => {
        updateUrl(parsedData);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [parsedData, updateUrl]);

  // Theme Toggle Logic
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Global Context Menu Handler
  useEffect(() => {
    const handleContextMenu = (e) => {
      // Allow context menu ONLY on inputs and textareas (Editor)
      const isInput = ['INPUT', 'TEXTAREA'].includes(e.target.tagName);
      if (!isInput) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // Template Handler
  const [pendingTemplate, setPendingTemplate] = useState(null);

  const handleTemplateLoad = (templateData) => {
    // Show modal instead of native confirm
    setPendingTemplate(templateData);
  };

  const confirmTemplateLoad = () => {
    if (pendingTemplate) {
      setJson(pendingTemplate);
      setPendingTemplate(null);
    }
  };

  const cancelTemplateLoad = () => {
    setPendingTemplate(null);
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background-primary text-text-primary transition-colors duration-300">
      <Header stats={stats} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} data={parsedData} />

      <main className="flex-1 flex overflow-hidden relative">
        <SplitView showEditor={showEditor} setShowEditor={setShowEditor}>
          {/* Editor Panel (Left) */}
          <JsonEditor
            rawText={rawText}
            onTextChange={handleTextChange}
            error={error}
            onLoadTemplate={handleTemplateLoad}
            history={history}
          />

          {/* Preview Panel (Right) */}
          <PreviewPanel
            data={parsedData}
            stats={stats}
          />
        </SplitView>
      </main>

      {pendingTemplate && (
        <ConfirmationModal
          title="Cargar Template"
          message="Esta acción reemplazará todo el contenido actual del editor. ¿Estás seguro de que quieres continuar?"
          confirmText="Sí, reemplazar"
          onConfirm={confirmTemplateLoad}
          onCancel={cancelTemplateLoad}
        />
      )}
    </div>
  );
}

export default App;
