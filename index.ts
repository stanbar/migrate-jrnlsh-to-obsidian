import { format } from "https://deno.land/std@0.149.0/datetime/mod.ts";
import {
  copy,
  ensureDir,
} from "https://deno.land/std@0.149.0/fs/mod.ts";
import replaceInFile from "./node_modules/replace-in-file/index.js";
import friendsDictionary from "./tagsDictionary.ts";

if (Deno.args.length == 0) {
  throw new Error(
    "Please provide path to directory with jrnl.sh entries exported as JSON files. To do so run: jrnl.sh --format json --file <path>",
  );
}

const jrnlDir = Deno.args[0];
console.log(`Provided path to jrnl.sh entries ${jrnlDir}`);


const fileNames = [];
for (const file of Deno.readDirSync(jrnlDir)) {
  if (file.isFile) {
    fileNames.push(file.name);
  }
}

const keys = Array.from(friendsDictionary.keys()).map((key) =>
  new RegExp(`(?!\\[\\[)@?\\b(${key})\\b(?![\\]a-z])`, "gi")
);
const values = Array.from(friendsDictionary.values());

const replaceJrnlTagsWithObsidianLinks = async (filePath: string) => {
  const options = {
    countMatches: true,
    files: filePath,
    from: keys,
    to: values,
  };

  await replaceInFile(options);
};

for (const fileName of fileNames) {
  const filePath = `${jrnlDir}/${fileName}`;

  await replaceJrnlTagsWithObsidianLinks(filePath);

  const entryRaw = await Deno.readTextFile(filePath);
  const entry = JSON.parse(entryRaw);
  const { title, date, body } = entry;

  const dateObj = new Date(date);
  await ensureDir(
    `out/${format(dateObj, "yyyy")}/${format(dateObj, "yyyy-MM")}`,
  );
  let content = body;
  if (body.indexOf("What-am-I-grateful-for:") == -1){
    content = title +"\n" + body;
  } 
  console.log(
    `Write to out/${format(dateObj, "yyyy")}/${
      format(dateObj, "yyyy-MM")
    }/${date}.md`,
  );
  Deno.writeTextFileSync(
    `out/${format(dateObj, "yyyy")}/${format(dateObj, "yyyy-MM")}/${date}.md`,
    content,
  );

}

console.log(`Found ${fileNames.length} entries`);
