# Migrate jrnl to obisdian

## Usage

### Node interp

We use node interop and pnpm for `replace-in-file` package, which facilitate the process of replacing @tags with [[obsidian links]].

1. rename `_package.json` to `package.json` to fix conflicts with `deno lsp` and `tesserver`.
2. `npnm install`

### Create personal tags dictionary

You can find out all your tags used in `jrnl`s with `jrnl --tags`.

1. Create `tagsDictionary.ts` file with following structure

```ts

const friendsDictionary = new Map<string, string>([
  ["tag1","[[obsidian link replacement]]"],
  ["tag2","[[Tag2]]"],
  // ...
  ["tagN","[[Tag N]]"],

]);

export default friendsDictionary;

```

### Run

2. Execute `migrate.sh`
3. The output will be in `out/`

