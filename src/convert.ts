import * as fs from 'node:fs';
import { wordlists } from "./wordlists";

function prepareForImport(entries: any[]): string[] {
  return entries.map(entry => {
    const { headword, definition } = entry;
    return `${headword}\t${definition}`;
  });
}


async function convertAll() {
  for (const list of wordlists) {
    console.log(`Converting wordlist ${list}...`);
    const content = fs.readFileSync(`data/wordlist-${list}.json`, "utf8");

    const entries = JSON.parse(content);
    const preparedEntries = prepareForImport(entries);
    fs.writeFileSync(`data/wordlist-${list}.txt`, preparedEntries.join("\n"), "utf8");
  }
}

convertAll().then(() => {
  console.log("Done.");
}).catch((error) => {
  console.error("Error:", error);
});
