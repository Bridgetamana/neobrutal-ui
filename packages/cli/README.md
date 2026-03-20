# neobrutal-ui

CLI for adding Neobrutal UI components to your project.

## Usage

### Initialize your project

```bash
npx neobrutal init
```

This will:

- Create a `components.json` configuration file
- Set up the `cn` utility function
- Create the required directory structure

### Add components

```bash
npx neobrutal add button
npx neobrutal add card dialog input
npx neobrutal add --all
```

### List available components

```bash
npx neobrutal list
```

### Check for updates

```bash
npx neobrutal diff button
```

## Registry

The CLI pulls component metadata from the hosted registry by default:

- `https://www.neobrutalui.live/r`

To test against a different registry (for staging or local mirrors), set:

```bash
NEOBRUTAL_REGISTRY_URL="https://your-registry.example.com/r" npx neobrutal list
```

## Release Automation

CLI publishing is automated through GitHub Actions:

1. Bump `packages/cli/package.json` version.
2. Push a matching tag in the format `cli-v<version>` (example: `cli-v0.3.2`).
3. The release workflow validates tag/version parity, builds the CLI, publishes to npm, and creates a GitHub release.

Required repository secret:

- `NPM_TOKEN`

## Commands

| Command | Description |
| --------- | ------------- |
| `init` | Initialize your project and install dependencies |
| `add [components...]` | Add components to your project |
| `list` | List all available components |
| `diff <component>` | Show differences between local and registry version |

## Options

### Global Options

| Option | Description |
| -------- | ------------- |
| `-c, --cwd <cwd>` | The working directory (defaults to current directory) |
| `-h, --help` | Display help for command |
| `-v, --version` | Display the version number |

### Add Options

| Option | Description |
| -------- | ------------- |
| `-y, --yes` | Skip confirmation prompt |
| `-o, --overwrite` | Overwrite existing files |
| `-a, --all` | Add all available components |

### Init Options

| Option | Description |
| --------- | ------------- |
| `-y, --yes` | Skip confirmation prompt |
| `-f, --force` | Force overwrite of existing configuration |

## License

MIT
