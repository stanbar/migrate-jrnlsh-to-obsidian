import { format } from "https://deno.land/std@0.149.0/datetime/mod.ts";
import {
  ensureDir,
  ensureDirSync,
  copy,
} from "https://deno.land/std@0.149.0/fs/mod.ts";
import replaceInFile from "./node_modules/replace-in-file/index.js"
import friendsDictionary from "./tagsDictionary.ts";

if (Deno.args.length == 0) {
  throw new Error(
    "Please provide path to directory with jrnl.sh entries exported as JSON files. To do so run: jrnl.sh --format json --file <path>",
  );
}

const jrnlDir = Deno.args[0];
console.log(`Provided path to jrnl.sh entries ${jrnlDir}`);


const frontMatterDictionary = new Map<string, string>([
  ["What am I grateful for?","What-am-I-grateful-for:"],
  ["What would make today great day?","What-would-make-today-great:"],
  ["I'm","I-am:"],
  ["What I did yesterday great?","What-I-did-great-yesterday:"],
]);

const fileNames = [];
for (const file of Deno.readDirSync(jrnlDir)) {
  if (file.isFile) {
    fileNames.push(file.name);
  }
}


for (const fileName of fileNames) {
  const filePath = `${jrnlDir}/${fileName}`;
  const rawEntry = await Deno.readTextFile(filePath);
  const entry = JSON.parse(rawEntry);
  const { title, date, time, tags, starred, body } = entry;

  const keys = Array.from(friendsDictionary.keys()).map(key => new RegExp(`(?!\\[\\[)@?(${key})(?![\\]a-z])`, "gi"));
  const values = Array.from(friendsDictionary.values())

  const options = {
    countMatches: true,
    files: filePath,
    from: keys,
    to: values,
  };

  const dateObj = new Date(date);

  await ensureDir(`out/${format(dateObj, "yyyy")}/${format(dateObj, "yyyy-MM")}`)

  // I am reaplacing in json, shouldn't I reaplce in markdown instead?
  await replaceInFile(options)

  console.log(`Write to ./${format(dateObj, "yyyy")}/${format(dateObj, "yyyy-MM")}/${date}.md`);
  copy(filePath, `out/${format(dateObj, "yyyy")}/${format(dateObj, "yyyy-MM")}/${date}.md`)
}

console.log(`Found ${fileNames.length} entries`);
