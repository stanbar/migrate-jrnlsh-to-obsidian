# Migrate jrnl to obisdian

## Usage

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

2. Execute `migrate.sh`
3. The output will be in `out/`
