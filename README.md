# Hotaru

> Brief tagline or description of what your project does

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

Mobile app build in react-native to help me control my finances, manage track my learning, and keep working on my health

<!-- ### Key Highlights

- First major highlight
- Second major highlight
- Third major highlight -->

## ✨ Features

- **Finance**: Control spendings and investment track
<!-- - **Feature 2**: Description of feature two
- **Feature 3**: Description of feature three
- **Feature 4**: Description of feature four -->

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js >= 18.0.0
- npm >= 9.0.0 or pnpm >= 8.0.0
- Git
- Any other specific requirements

## 🚀 Installation

### Quick Start

```bash
# Clone the repository
git clone https://github.com/luk3mn/hotaru.git

# Navigate to project directory
cd hotaru

# Install dependencies
bun install

# # Copy environment variables
# cp .env.example .env

# Run the development server
npx expo run:android --device
```

__NOTE: If build fails, try moving out the mobile project folder to outside of the turborepo before running ```npx expo run:android --device```, install the de dependencies with ```bum i```, and then move it in again and run the project once again__

<!-- ### Docker Installation

```bash
# Build the Docker image
docker build -t hotaru .

# Run the container
docker run -p 3000:3000 hotaru
``` -->

<!-- ## 💻 Usage

### Basic Usage

Provide simple examples of how to use your project:

```javascript
import { YourModule } from 'hotaru';

const instance = new YourModule({
  option1: 'value1',
  option2: 'value2'
});

instance.doSomething();
```

### Advanced Usage

Show more complex examples with detailed explanations:

```javascript
// More sophisticated example
const result = await instance.advancedMethod({
  configuration: {
    nested: 'options'
  }
});
``` -->

<!-- ## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application
APP_NAME=hotaru
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# API Keys
API_KEY=your-api-key
API_SECRET=your-api-secret
```

### Configuration File

Explain any configuration files and their options:

```json
{
  "setting1": "value1",
  "setting2": {
    "nested": "value2"
  }
}
``` -->

## 🏗️ Architecture

Describe your project's architecture and structure:

```
project-root/
├── src/
│   ├── components/     # Reusable components
│   ├── apps/           # Screen components
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript types
└── public/             # Static assets
```

### Key Design Decisions

Explain important architectural choices and patterns used in the project.

<!-- ## 📚 API Documentation

### Endpoints

#### GET `/api/resource`

Retrieve all resources.

**Parameters:**
- `limit` (optional): Number of items to return
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "data": [],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

#### POST `/api/resource`

Create a new resource.

**Request Body:**
```json
{
  "name": "Resource Name",
  "description": "Resource description"
}
```

**Response:**
```json
{
  "id": "123",
  "name": "Resource Name",
  "createdAt": "2024-01-01T00:00:00Z"
} -->
```

## 🔧 Development

### Setting Up Development Environment

```bash
# Install development dependencies
bun install
```

<!-- ### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

### Code Style

This project follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). Code is automatically formatted using Prettier and linted with ESLint. -->

<!-- ## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test path/to/test.spec.ts
```

### Writing Tests

Example test structure:

```javascript
describe('Component/Function Name', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = yourFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
}); -->
```

## 🚢 Deployment

### Production Build

```bash
# Create production build
eas build -p android --profile production
```

<!-- ### Deployment Platforms

#### Vercel

```bash
npm install -g vercel
vercel --prod
``` -->

<!-- #### Docker

```bash
docker build -t hotaru:latest .
docker push your-registry/hotaru:latest
``` -->

### Environment-Specific Configuration

Explain any differences between development, staging, and production environments.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style
- Ensure all tests pass before submitting PR

## 🐛 Troubleshooting

### Common Issues

**Issue: Installation fails with dependency errors**

Solution: Clear your package manager cache and try again:
```bash
cd android/
./gradlew clean
rm -rf node_modules bun.lock
bun install
```

**Issue: Port already in use**

Solution: Change the port in your `.env` file or kill the process using the port:
```bash
lsof -ti:8081 | xargs kill
```

<!-- ### Getting Help

- Check existing [GitHub Issues](https://github.com/luk3mn/hotaru/issues)
- Join our [Discord community](https://discord.gg/your-invite)
- Read the [detailed documentation](https://docs.yourproject.com) -->

<!-- ## ❓ FAQ

**Q: Question one?**

A: Answer to question one.

**Q: Question two?**

A: Answer to question two.

**Q: How do I report a bug?**

A: Please open an issue on GitHub with detailed information about the bug, including steps to reproduce it. -->

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- **Author**: Lucas Renan
- **Email**: lucasnunes2030@gmail.com
- **GitHub**: [@luk3mn](https://github.com/luk3mn)
- **Website**: [https://lucasmaues.vercel.app/](https://lucasmaues.vercel.app/)

## 🙏 Acknowledgments

- Credit to libraries or resources used
- Thanks to contributors
- Inspiration sources

---

Made with by [Your Name](https://github.com/luk3mn)