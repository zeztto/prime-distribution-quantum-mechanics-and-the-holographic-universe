# Prime Distribution, Quantum Mechanics, and the Holographic Universe

A modern web application for presenting the academic paper "소수의 분포, 양자역학, 그리고 홀로그래픽 우주" (Prime Distribution, Quantum Mechanics, and the Holographic Universe).

## Overview

This project is a dark-themed blog application built with React Router v7 that presents a theoretical framework connecting:

- The Riemann Hypothesis and prime number distribution
- Quantum mechanics and the Montgomery-Dyson discovery
- Holographic universe theory with testable predictions

## Features

- 🌑 **Dark Mode Design** - Permanent dark theme optimized for readability
- 📖 **Interactive Paper Reading** - Clean, distraction-free reading experience
- 📑 **Table of Contents** - Easy navigation through 7 paper sections
- ✨ **Smooth Animations** - Framer Motion for elegant transitions
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- 🎨 **Tailwind CSS** - Modern styling with custom dark mode configuration
- ⚡️ **Hot Module Replacement** - Fast development experience
- 🔒 **TypeScript** - Type-safe codebase

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Project Structure

```
app/
├── components/
│   ├── PaperMarkdownSection.tsx  # Markdown renderer with dark mode
│   ├── PaperSection.tsx           # Paper section component
│   ├── TableOfContents.tsx        # Navigation TOC
│   └── ThemeToggle.tsx            # Theme toggle (legacy)
├── contexts/
│   └── ThemeContext.tsx           # Theme context provider
├── data/
│   └── paper-content.ts           # Paper content and metadata
├── routes/
│   ├── home.tsx                   # Landing page
│   ├── paper.tsx                  # Main paper reading page
│   ├── paper-full.tsx             # Full paper view (alternative)
│   └── paper-sections-backup.tsx # Backup sections
└── root.tsx                       # App root component

public/
├── full-paper.md                  # Full paper markdown
└── paper.pdf                      # PDF version
```

## Paper Sections

1. **서론 (Introduction)** - Historical context and motivation
2. **양자역학적 해석 (Quantum Mechanical Interpretation)** - Montgomery-Dyson connection
3. **홀로그래픽 원리와 회전하는 블랙홀 (Holographic Principle and Rotating Black Holes)** - Theoretical framework
4. **이론적 예측 (Theoretical Predictions)** - Five testable predictions (2025-2035)
5. **수학적 형식화 (Mathematical Formalization)** - Rigorous mathematical treatment
6. **결론 (Conclusion)** - Summary and implications
7. **참고문헌 (References)** - Academic sources

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

The built application can be deployed to any platform that supports Node.js:

- Vercel
- Netlify
- AWS
- Google Cloud
- Digital Ocean
- Railway
- Fly.io

### Docker Deployment

```bash
docker build -t paper-blog .
docker run -p 3000:3000 paper-blog
```

## Technology Stack

- **React Router v7** - Full-stack React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Markdown** - Content formatting
- **Vite** - Build tool and dev server

## Key Technical Implementations

### Dark Mode
- Permanent dark theme (no toggle)
- Custom Tailwind configuration with `darkMode: 'class'`
- Optimized text colors for readability (white/light gray on dark backgrounds)

### Markdown Rendering
- Custom prose styles with `!important` overrides
- Syntax highlighting for code blocks
- Responsive typography
- Proper heading hierarchy with scroll anchors

### Animations
- Framer Motion entrance animations
- Staggered section reveals
- Smooth transitions between states

## Contributing

This is an academic paper presentation project. For questions or suggestions, please open an issue.

## License

This project is for academic and educational purposes.

---

Built with ❤️ using React Router
