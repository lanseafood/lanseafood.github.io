# Lanssie Portfolio

Portfolio website with a rotating 3D cube and interactive carousel navigation.

## Setup

This project uses TypeScript for the JavaScript code. The source files are in `src/` and compile to `js/`.

### Prerequisites

- Node.js and npm

### Installation

```bash
npm install
```

### Development

Compile TypeScript files:

```bash
npm run build
```

Watch for changes and auto-compile:

```bash
npm run watch
```

Start development server (with TypeScript watch mode):

```bash
npm run dev
```

This will:
- Compile TypeScript files
- Start TypeScript in watch mode (auto-recompiles on changes)
- Start a local server at `http://localhost:3000` and open it in your browser

Or just start the server without watch mode:

```bash
npm run serve
```

## Project Structure

- `src/` - TypeScript source files
  - `rotating.ts` - Three.js rotating cube logic
  - `carousel.ts` - 3D carousel navigation logic
- `js/` - Compiled JavaScript files (generated)
- `css/` - Stylesheets
- `index.html` - Main page

## Features

- **Rotating Cube**: Three.js-powered white cube that continuously rotates
- **3D Carousel**: CSS 3D transforms create a cube-like carousel with text panels
- **Navigation**: Click navigation buttons to rotate between different sections (home, projects, art, connect)

## Build

The TypeScript files compile to regular JavaScript that can be loaded as script tags. No bundler required.
