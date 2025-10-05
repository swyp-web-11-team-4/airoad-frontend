# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite frontend application for Team 4's SWYP Web project (11기). The project uses:
- **Vite** with SWC for fast builds and hot module replacement
- **React 19** with TypeScript in strict mode
- **Biome** for linting and formatting (instead of ESLint/Prettier)
- **pnpm** as the package manager

## Commands

### Development
```bash
pnpm dev          # Start development server with HMR
pnpm build        # Type check and build for production
pnpm preview      # Preview production build locally
```

### Code Quality
```bash
pnpm lint         # Check code with Biome linter
pnpm lint:fix     # Auto-fix linting issues
pnpm format       # Check code formatting
pnpm format:fix   # Auto-format code
```

## Architecture

### Build Configuration
- **Vite config**: Uses `@vitejs/plugin-react-swc` for Fast Refresh via SWC (not Babel)
- **TypeScript**: Project references split between app code (`tsconfig.app.json`) and build tooling (`tsconfig.node.json`)
- **Strict mode**: TypeScript strict mode enabled with additional checks for unused locals/parameters

### Code Style
- **Biome** handles both linting and formatting
- Line width: 100 characters
- Indent: 2 spaces
- Key rules: `noExplicitAny`, `useExhaustiveDependencies`, `noNonNullAssertion` set to warn
- Organize imports automatically enabled

### Entry Points
- **HTML**: `index.html` (root level, Vite convention)
- **App entry**: `src/main.tsx` renders `App.tsx` in React StrictMode
- **Root element**: `#root` in index.html

## Notes
- The React Compiler is not compatible with SWC (see project README)
- Use `pnpm` for all package management operations
- Biome lints only `src/**/*.ts` and `src/**/*.tsx` files
