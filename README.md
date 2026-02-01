<div align="center">

# 🚀 JSON Viewer & Portfolio Builder

**Transform raw JSON into beautiful, interactive UI cards in real-time.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Card Types](#-card-types) • [Author](#-author)

</div>

---

## 📋 Overview

**LecturaJson** is a powerful development tool that reimagines how we view and share JSON data. Instead of a boring text tree, it renders your data as **rich, interactive cards**. It's perfect for creating quick portfolios, server configurations, or simply debugging complex JSON structures with style.

Key capabilities include:

- 🎨 **Visual Rendering** instantly turns JSON into UI components
- 🔗 **Deep Linking** automatically saves your state in the URL
- 📸 **Smart Export** allows you to download any card as a high-quality PNG
- 🛠️ **Pro Templates** like the "FeresDev Ultimate" portfolio or Hytale Server Configs

---

## ✨ Features

### Core Functionality

| Feature                  | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| **Real-Time Editor**     | Instant parsing with error highlighting                 |
| **Relaxed Parsing**      | Supports multi-line strings and loose formatting        |
| **Collapsible Cards**    | Auto-collapses large content to keep UI clean           |
| **Smart Thumbnails**     | Auto-generates covers for YouTube video links           |
| **Clean Export**         | Download cards as PNGs (Proxy-enabled for CORS)         |
| **Deep Linking**         | Share your exact workspace via compressed URL           |

### User Experience

- 🌓 **Theme System** — Toggle between Dark (default) and Light modes
- 📱 **Responsive Design** — Fully functional on mobile and desktop via Split View
- 🧩 **Templates** — One-click loadable presets for common use cases
- 🔍 **Search & Filter** — Instantly find content within your JSON data

---

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm, yarn, or pnpm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/FeresDev/lectura-json.git

# Navigate to the project
cd lectura-json

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📖 Usage

### 1. The Editor

Type or paste your JSON in the left panel. The parser is forgiving and supports standard JSON as well as some relaxed syntax.

### 2. The Preview

The right panel automatically renders your data. It detects the structure (Arrays, Objects) and chooses the best visualization.

### 3. Smart Actions

- **Download**: Hover over any card and click the download icon to save it as an image.
- **Expand**: Large code blocks or lists will show a "Ver más" button.
- **Share**: Copy the URL to share your exact configuration with anyone.

---

## 🃏 Card Types

The renderer automatically detects content types, but you can force them:

| Type      | Key Features                                      |
|ধি---------|---------------------------------------------------|
| `video`   | YouTube integration, auto-thumbnails, duration    |
| `code`    | Syntax highlighting (PrismJS), auto-formatting    |
| `mixed`   | Text + Image + Tags layouts                       |
| `list`    | Styled bullet points or numbered lists            |
| `link`    | Rich link previews with favicons                  |

### Example JSON

```json
{
  "posts": [
    {
      "type": "video",
      "title": "My New Tutorial",
      "videoUrl": "https://youtu.be/example",
      "tags": ["DEV", "REACT"]
    },
    {
      "type": "code",
      "language": "json",
      "content": { "server": "online", "players": 50 }
    }
  ]
}
```

---

## 🛠️ Tech Stack

| Technology         | Purpose                 |
| ------------------ | ----------------------- |
| **React 19**       | UI Framework            |
| **Vite 7**         | Build Tool & Dev Server |
| **Tailwind CSS 4** | Styling                 |
| **Lucide React**   | Icons                   |
| **PrismJS**        | Syntax Highlighting     |
| **html-to-image**  | Export Functionality    |
| **LZ-String**      | URL Compression         |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add: AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

<div align="center">

**FeresDev**

_Creator & Lead Developer_

[![GitHub](https://img.shields.io/badge/GitHub-killerSkull-181717?style=for-the-badge&logo=github)](https://github.com/killerSkull)

</div>

---

## 📄 License

This project is **free to use**. If you use or modify this project, please give credit to the original creator:

> **Original idea & development by [FeresDev](https://github.com/killerSkull)**

---

<div align="center">

**Made with ❤️ for the developer community**

⭐ Star this repository if you find it useful!

</div>
