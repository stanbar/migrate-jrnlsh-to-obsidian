# Migrate jrnl to obisdian

## Usage

### Node interp

We use [Deno](https://deno.land/) with node interop and [pnpm](https://pnpm.io/) for [replace-in-file](https://www.npmjs.com/package/replace-in-file) package, which facilitate the process of replacing @tags with [[obsidian links]].

1. Run `npnm install` to download the package into `node_modules`.

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



