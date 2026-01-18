# Portfolio - Desktop OS

A macOS-inspired portfolio website built with Next.js 14+, featuring a desktop-like interface with draggable windows, a dock with magnification effects, and glassmorphism design.

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## 📂 Project Structure

```
port/
├── public/              # High-res wallpapers and assets
├── src/
│   ├── app/            # Next.js App Router (Layout & Home)
│   ├── components/
│   │   ├── desktop/    # Taskbar, Dock, WindowManager, Window
│   │   ├── apps/       # Projects, AboutMe, Experience, CoffeeApp (to be implemented)
│   │   └── ui/         # Atomic components (Shadcn - to be added)
│   ├── hooks/          # useWindowManager.ts
│   ├── lib/            # Constants, utils.ts
│   └── types/          # Window and App interfaces
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## ✨ Features

### ✅ Implemented

- **Window Management System**: Centralized Zustand store managing window state, z-index, and positioning
- **Draggable Windows**: Windows can be dragged around the desktop using Framer Motion
- **Traffic Light Buttons**: macOS-style window controls (close, minimize, maximize)
- **Dock Component**: Bottom dock with magnification effect on hover
- **Glassmorphism Design**: Backdrop blur effects with semi-transparent backgrounds
- **Mesh Gradient Background**: Beautiful gradient background with radial overlays
- **Window Maximize**: Double-click title bar or click green button to maximize
- **Window Minimize**: Click yellow button to minimize windows
- **Active Window Highlighting**: Active windows have a blue ring indicator

### 🚧 To Be Implemented

- **Projects App**: Finder-style interface with sidebar navigation and project details
- **About Me App**: Bento grid layout with Spotify "Now Playing" and photo carousel
- **Experience App**: GitHub-style contribution graph timeline
- **Coffee App**: Calendar interface for booking meetings in San Francisco
- **Desktop Icons**: Clickable desktop icons for apps
- **Taskbar**: Top taskbar showing open windows

## 🎨 Design System

- **Aesthetic**: macOS Sequoia "Glassmorphism"
- **Colors**: Light mode (bg-white/70) and Dark mode (bg-black/70)
- **Effects**: backdrop-blur-md, border-white/20
- **Animations**: Framer Motion spring transitions throughout

## 📝 Notes

- The app is a single-page fixed-position desktop (no body scrolling)
- All windows are managed through a centralized `useWindowManager` hook
- Z-index is automatically managed to bring active windows to the front
- Windows respect viewport boundaries when dragging

## 🔧 Configuration

The project uses:
- **TypeScript** for type safety
- **ES Modules** (package.json has `"type": "module"`)
- **Tailwind CSS v4** with PostCSS
- **Next.js 16** with Turbopack

## 📄 License

ISC
