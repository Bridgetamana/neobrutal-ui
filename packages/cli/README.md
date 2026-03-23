# Neobrutal UI CLI

The official command-line interface for [Neobrutal UI](https://www.neobrutalui.live). Use this tool to initialize your project configuration and add Neobrutalism-styled components to your applications.

## Usage

You can run the CLI directly using `npx`:

```bash
npx neobrutal <command> [options]
```

### Commands

#### `init`
Initialize your project and install required base dependencies.

```bash
npx neobrutal init
```

**Options:**
- `-c, --cwd <cwd>`: The working directory (defaults to current directory).
- `-y, --yes`: Skip the confirmation prompt and use default values.
- `-f, --force`: Force overwrite of existing `components.json` configuration.
- `--skip-css`: Skip CSS variable injection for Neobrutalism styles.

#### `add [components...]`
Add individual components to your project.

```bash
npx neobrutal add button
npx neobrutal add card dialog input
```

**Options:**
- `-c, --cwd <cwd>`: The working directory.
- `-y, --yes`: Skip confirmation prompt.
- `-o, --overwrite`: Overwrite existing files if they already exist.
- `-a, --all`: Add all available components.

#### `update [components...]`
Update installed components to their latest versions from the registry.

```bash
npx neobrutal update button
npx neobrutal update --all
```

**Options:**
- `-a, --all`: Update all currently installed components.
- `-f, --force`: Skip confirmation prompt and overwrite files.
- `--dry-run`: Show what would be updated without making actual changes.

#### `list`
List all available UI components, utilities, and hooks in the registry.

```bash
npx neobrutal list
```

#### `diff <component>`
Show differences between your local component and the latest registry version.

```bash
npx neobrutal diff button
```

**Options:**
- `--no-diff`: Only show if files differ, don't output the actual patch diff.
- `--context <lines>`: Specify the number of context lines to show in the diff (defaults to 3).

## License

This project is licensed under the terms of the MIT License.
