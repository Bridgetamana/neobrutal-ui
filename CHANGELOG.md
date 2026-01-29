# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Next]

## [0.3.1] - 2026-01-29

### Added

- Color theme picker
- Pull request template
- Search modal for quick component navigation

### Changed

- Update nextjs version
- Update color variables
- Sonner toast to base ui toast
- Replace prism-react-renderer with shiki
- Update all 21 components

### Removed

- Skeleton component
- Breadcrumb component

## [0.3.0] - 2026-01-04

### Fixed

- Tailwind v4 compatibility - complete `@theme inline` block with all required CSS variables
- Added `shadow-brutal` utility class in `@layer utilities` for proper shadow rendering
- Skip reinstalling dependencies that are already in package.json
- Removed invalid schema URL from components.json

### Changed

- Dependencies are now only installed if not already present in package.json
- Utils file is silently skipped when adding new components if content matches

## [0.2.0] - 2026-01-03

### Added

- Update command with `--all`, `--force`, and `--dry-run` options
- Unified diff output with colored additions/deletions in `diff` command
- CSS variable injection during `init` for neobrutalism design tokens
- Framework detection for Next.js (App/Pages Router), Vite, Remix, Astro
- Automatic CSS path detection
- Package manager detection (npm, pnpm, yarn, bun)
- Import path transformation based on user's alias configuration

### Changed

- All 22 components now properly depend on `utils` in registry
- Removed v3 support

### Fixed

- Components no longer break after install due to missing utils dependency
- Version mismatch fixed by reading from package.json dynamically

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
- 22 Neobrutalism UI components
  - Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card
  - Checkbox, Dialog, Input, Label, Pagination, Popover
  - Progress, Radio Group, Select, Skeleton, Slider
  - Switch, Sonner, Tabs, Textarea, Tooltip
- `npx neobrutal` command-line tool init, add, list, and diff
- Component docs with live previews and code examples
- JSON-based component registry at `/r/`
- CSS variables for theming (`--main`, `--bg`, `--bw`, `--border`, `--shadow-brutal`)
