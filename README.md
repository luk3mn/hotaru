# Hotaru

> A gamified personal finance and life-tracking mobile app built with Expo.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-000020.svg?logo=expo)](https://expo.dev/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

## Overview

Hotaru is a cross-platform mobile application designed to help you take control of your finances, track personal growth, and monitor progress across key life attributes. The app combines personal finance management with gamified life-tracking, using RPG-inspired mechanics like HP, XP, and attribute levels to make self-improvement engaging.

## Features

### Finance

- **Budget Dashboard** — Visualize your budget allocation with a donut chart broken down by category (essential expenses, variable expenses, investments, fixed payments, reserves/goals)
- **Transaction Tracking** — Record and browse expenses with swipeable transactions grouped by day
- **Income, Investments & Goals** — Dedicated sections for managing income streams, investment portfolios, and financial goals (partially implemented)
- **Quick Entry** — Floating action button with a calculator-style modal for fast transaction input

### Life Attributes

- **Attribute Dashboard** — Track six core life attributes (Physical, Mental, Social, Professional, Wellbeing, Financial) with color-coded progress bars and levels
- **HP & XP System** — Gamified header with health points and experience points for motivation
- **Quick Progress Updates** — Tap into any attribute to log activities and earn XP

### General

- **Dark & Light Themes** — Full Catppuccin theme system (Mocha for dark, Latte for light)
- **Bilingual** — English and Portuguese (Brazilian) with automatic device locale detection
- **Settings** — Persisted preferences for theme, language, and notifications
- **Cross-Platform** — Runs on Android, iOS, and Web via Expo

## Screenshots

_Add screenshots here_

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js >= 18.0.0
- Bun (recommended) or npm
- Git
- Android Studio (for Android builds) or Xcode (for iOS builds)
- EAS CLI (for cloud builds)

## Installation

### Quick Start

```bash
# Clone the repository
git clone https://github.com/luk3mn/hotaru.git

# Navigate to project directory
cd hotaru

# Install dependencies
bun install

# Run the development server
npx expo run:android --device
```

> **Note:** If the build fails, try moving the mobile project folder out of the monorepo temporarily, run `bun i` and `npx expo run:android --device`, then move it back.

## Architecture

### Project Structure

```
project-root/
├── apps/
│   └── mobile/
│       ├── src/
│       │   ├── app/            # File-based routing (expo-router)
│       │   │   ├── (tabs)/     # Main tab navigation group
│       │   │   └── (finance)/  # Finance sub-route stack
│       │   ├── components/     # Reusable UI components
│       │   ├── contexts/       # React Context providers (Theme, Language)
│       │   ├── i18n/           # Internationalization (en/pt)
│       │   ├── hooks/          # Custom React hooks
│       │   ├── lib/            # Utility libraries
│       │   ├── constants/      # App-wide constants (colors, dimensions)
│       │   └── assets/         # Fonts, icons, splash screens
│       ├── android/            # Android native project
│       ├── app.json            # Expo configuration
│       ├── tailwind.config.js  # NativeWind/Tailwind configuration
│       └── metro.config.js     # Metro bundler configuration
├── packages/                   # Shared packages (monorepo)
└── package.json                # Turborepo workspace root
```

### Key Design Decisions

- **File-based routing** via `expo-router` for intuitive navigation structure
- **Compound component pattern** across UI components (Header, Modal, Card, Button, etc.) for flexible composition
- **Catppuccin color system** for consistent, themeable design tokens
- **NativeWind (Tailwind CSS)** for familiar, utility-first styling in React Native
- **RPG gamification** — life attributes are mapped to game-like mechanics (HP, XP, levels) to make tracking engaging

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Expo SDK 54, React 19, React Native 0.81 |
| **Routing** | expo-router 6 (with React Navigation) |
| **Styling** | NativeWind 4 + Tailwind CSS |
| **Animation** | React Native Reanimated 4, Gesture Handler |
| **i18n** | i18n-js + expo-localization |
| **Storage** | expo-sqlite, AsyncStorage |
| **Icons** | lucide-react-native, @expo/vector-icons |
| **Carousel** | react-native-reanimated-carousel |
| **Monorepo** | Turborepo |

## Development

### Setting Up

```bash
# Install dependencies
bun install

# Start Expo dev server
npx expo start

# Run on Android device
npx expo run:android --device

# Run on iOS simulator
npx expo run:ios
```

### Project Scripts

| Command | Description |
|---|---|
| `bun install` | Install all dependencies |
| `npx expo start` | Start development server |
| `npx expo run:android --device` | Build and run on Android device |
| `npx expo run:ios` | Build and run on iOS simulator |

### Code Style

The project uses ESLint for linting and follows TypeScript best practices.

## Deployment

### Production Build (EAS)

```bash
# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat(scope): add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear, descriptive commit messages following conventional commits
- Add tests for new features
- Update documentation as needed
- Follow the existing code style
- Ensure all tests pass before submitting PR

## Troubleshooting

### Common Issues

**Issue: Installation fails with dependency errors**

Clear cache and reinstall:

```bash
cd android/
./gradlew clean
rm -rf node_modules bun.lock
bun install
```

**Issue: Port already in use**

Kill the process occupying the port:

```bash
lsof -ti:8081 | xargs kill
```

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Contact

- **Author**: Lucas Renan
- **Email**: lucasnunes2030@gmail.com
- **GitHub**: [@luk3mn](https://github.com/luk3mn)
- **Website**: [https://lucasmaues.vercel.app/](https://lucasmaues.vercel.app/)

## Acknowledgments

- [Catppuccin](https://github.com/catppuccin/catppuccin) — Beautiful pastel color palette
- [Expo](https://expo.dev/) — The best React Native framework
- [Lucide Icons](https://lucide.dev/) — Community-ran fork of Feather Icons
- Thanks to all contributors and early testers

---

Made with by [Lucas Renan](https://github.com/luk3mn)
