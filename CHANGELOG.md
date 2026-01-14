# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Command+K search modal for quick component navigation

## [0.3.0] - 2026-01-04

### Fixed

- **CLI**: Tailwind v4 compatibility - complete `@theme inline` block with all required CSS variables
- **CLI**: Added `shadow-brutal` utility class in `@layer utilities` for proper shadow rendering
- **CLI**: Skip reinstalling dependencies that are already in package.json
- **CLI**: Skip prompting for utils.ts overwrite when file content is identical
- **CLI**: Shell security warning on Windows (DEP0190 deprecation)
- **CLI**: Removed invalid schema URL from components.json

### Changed

- **CLI**: Dependencies are now only installed if not already present in package.json
- **CLI**: Utils file is silently skipped when adding new components if content matches

## [0.2.0] - 2026-01-03

### Added

- **CLI**: `update` command with `--all`, `--force`, and `--dry-run` options
- **CLI**: Unified diff output with colored additions/deletions in `diff` command
- **CLI**: CSS variable injection during `init` for neobrutalism design tokens
- **CLI**: Framework detection for Next.js (App/Pages Router), Vite, Remix, Astro
- **CLI**: tsconfig.json alias prefix detection (`@/`, `~/`, `#/`, `$/`)
- **CLI**: Automatic CSS path detection
- **CLI**: Package manager detection (npm, pnpm, yarn, bun)
- **CLI**: Auto-install of component dependencies during `add`
- **CLI**: Import path transformation based on user's alias configuration
- **CLI**: Parallel registry fetching with retry logic

### Changed

- **CLI**: All 22 components now properly depend on `utils` in registry
- **CLI**: Simplified to Tailwind CSS v4 only (removed v3 support)

### Fixed

- **CLI**: Components no longer break after install due to missing utils dependency
- **CLI**: Version mismatch fixed by reading from package.json dynamically

## [0.1.1] - 2025-12-15

### Added

- Work in progress note to README
- Vercel Analytics integration

### Changed

- Renamed CLI from `neobrutal-ui` to `neobrutal`
- Updated contributing guidelines and registry homepage URL

### Fixed

- React Server Components CVE vulnerabilities

## [0.1.0] - 2025-12-01

### Added

- Initial release of Neobrutal UI
- **Components**: 22 Neobrutalism UI components
  - Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card
  - Checkbox, Dialog, Input, Label, Pagination, Popover
  - Progress, Radio Group, Select, Skeleton, Slider
  - Switch (Sonner toast), Tabs, Textarea, Tooltip
- **CLI**: `npx neobrutal` command-line tool
  - `init` - Initialize project with components.json
  - `add` - Add components from registry
  - `list` - List all available components
  - `diff` - Show differences between local and registry
- **Documentation**: Component docs with live previews and code examples
- **Registry**: JSON-based component registry at `/r/`
- **Styling**: CSS variables for theming (`--main`, `--bg`, `--bw`, `--border`, `--shadow-brutal`)
- Built with Next.js 16, React 19, Tailwind CSS v4, Base UI primitives

### Technical

- ESM-only CLI with Commander.js
- Zod schema validation
- fs-extra for file operations
- prism-react-renderer for syntax highlighting

[Unreleased]: https://github.com/bridgetamana/neobrutal-ui/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/bridgetamana/neobrutal-ui/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/bridgetamana/neobrutal-ui/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/bridgetamana/neobrutal-ui/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/bridgetamana/neobrutal-ui/releases/tag/v0.1.0
