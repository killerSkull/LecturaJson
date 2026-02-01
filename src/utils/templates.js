export const TEMPLATES = {
    "FeresDev Ultimate": [
        {
            "type": "mixed",
            "title": "FeresDev - Desarrollo de Software & Gaming",
            "image": "https://feresdev.com/social-preview.jpg",
            "description": "Portafolio oficial de FeresDev. Especialista en React, Java y Automatización con n8n. Creador de contenido de Hytale y Minecraft.",
            "tags": ["Full Stack", "Creator", "CEO"],
            "author": "@feres_Dev"
        },
        {
            "type": "list",
            "title": "🚀 Stack Tecnológico 2026",
            "items": [
                "Frontend: React 19 + TailwindCSS v4",
                "Backend: Java Spring Boot + PocketBase",
                "DevOps: CloudPanel + Docker",
                "Auth: Supabase Integration"
            ]
        },
        {
            "type": "video",
            "title": "Tutorial Hytale: Farmear Shadoweave",
            "videoUrl": "https://youtu.be/EPg7jQ8JeGc",
            "description": "Descubre las mejores rutas para conseguir materiales raros en la última beta de Hytale.",
            "code": "GAMING"
        },
        {
            "type": "link",
            "title": "Portafolio Web",
            "url": "https://feresdev.com",
            "favicon": "https://feresdev.com/favicon.ico"
        },
        {
            "type": "video",
            "title": "Mis Amigos los Dinos",
            "videoUrl": "https://youtu.be/bneHpN5zHIo",
            "description": "Un paseo peligroso por el bioma jurásico. Sobreviviendo a duras penas."
        }
    ],
    "Hytale Server Config (Pro)": [
        {
            "type": "text",
            "title": "Server Configuration",
            "text": "This configuration file manages the core settings for the 'FeresLand' Hytale server. Edit the JSON below to apply hot-patches."
        },
        {
            "type": "code",
            "language": "json",
            "content": {
                "serverName": "FeresLand Survival",
                "maxPlayers": 100,
                "difficulty": "HARD",
                "features": {
                    "pvp": true,
                    "building": true,
                    "factions": false
                },
                "plugins": [
                    "Essentials-Hytale",
                    "WorldGuard-V2",
                    "FeresDev-Core"
                ],
                "motd": "§aWelcome to FeresLand! §bNew update live!"
            }
        },
        {
            "type": "mixed",
            "title": "Need Help?",
            "description": "Check the official documentation or join our Discord server for support with configuration.",
            "tags": ["Support", "Docs"]
        }
    ],
    "Content Creator Kit": [
        {
            "type": "image",
            "url": "https://images.unsplash.com/photo-1598550476439-cce86041e8c3?auto=format&fit=crop&w=1000",
            "title": "Stream Overlay Clean"
        },
        {
            "type": "list",
            "title": "Daily Stream Checklist",
            "items": [
                "Check Audio Levels (Mic & Game)",
                "Update Stream Title & Tags",
                "Post 'Going Live' tweet",
                "Open Chat Dashboard"
            ]
        },
        {
            "type": "link",
            "title": "OBS Studio Plugins",
            "url": "https://obsproject.com/forum/resources/",
            "favicon": "https://obsproject.com/favicon.ico"
        }
    ],
    "Starter Profile": {
        "title": "New User",
        "description": "Welcome! This is a simple profile card to get you started. Try editing this text on the left!",
        "image": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=500",
        "type": "mixed",
        "tags": ["New", "User"]
    }
};
