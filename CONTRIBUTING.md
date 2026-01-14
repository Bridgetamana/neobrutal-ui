# Contributing to Neobrutal UI

Thank you for your interest in contributing to Neobrutal UI. This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or pnpm
- Git

### Local Development

1. Fork the repository on GitHub.

2. Clone your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/neobrutal-ui.git
   cd neobrutal-ui
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.

## How to Contribute

### Reporting Bugs

Before submitting a bug report:

1. Search existing [issues](https://github.com/bridgetamana/neobrutal-ui/issues) to avoid duplicates.
2. Update to the latest version to check if the issue persists.

When submitting a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Browser and operating system information
- Screenshots if applicable

### Suggesting Features

Feature requests are welcome. Please:

1. Search existing issues to check if the feature has been requested.
2. Provide a clear description of the feature and its use case.
3. Explain how the feature aligns with the Neobrutalist design philosophy.

### Submitting Changes

1. Create a new branch from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the coding standards below.

3. Test your changes locally.

4. Commit your changes with a clear message:

   ```bash
   git commit -m "Add: description of your change"
   ```

5. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a Pull Request against the `main` branch.

### Pull Request Guidelines

- Provide a clear description of what your PR does.
- Reference any related issues using `Fixes #123` or `Closes #123`.
- Keep PRs focused on a single change.
- Ensure all tests pass and there are no lint errors.

## Adding a New Component

1. Install Base UI if not already installed:

   ```bash
   npm install @base-ui/react
   ```

2. Create the component file at `components/ui/component-name.tsx`.

3. Follow the existing component patterns for structure and styling.

4. Create a documentation page at `app/docs/components/component-name/page.tsx`.

5. Add the component to the sidebar in `app/docs/layout.tsx`.

6. Add the component to the registry in `public/r/`.

7. Update the CLI registry index.

## Questions

If you have questions, open an issue with the `question` label or start a discussion on GitHub.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
