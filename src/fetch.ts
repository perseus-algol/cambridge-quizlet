import * as fs from "node:fs";
import { wordlists } from "./wordlists";



function getPageUrl(wordlist: number, page: number = 1): string {
  return `https://dictionary.cambridge.org/plus/wordlist/${wordlist}/entries/${page}/`;
}

async function fetchPage(url: string): Promise<Response> {
  return fetch(url, {
    body: null,
    method: "GET"
  });
}

async function fetchDictionary(dict: number): Promise<any[]> {
  let status = undefined;
  let json: any[] = [];
  let page = 1;
  const entries: any[] = [];

  do {
    const pageUrl = getPageUrl(dict, page);
    const result = await fetchPage(pageUrl);
    status = result.status;

    if (status === 200) {
      json = await result.json();
      console.log(`Page ${page}, Words: ${json.length}`);
      entries.push(...json);
    }

    page++;
  }
  while (status === 200 && json.length > 0);
  
  return entries;
}

async function fetchAll() {
  for (const list of wordlists) {
    console.log(`Fetching wordlist ${list}...`);
    const entries = await fetchDictionary(list);
    fs.writeFileSync(`data/wordlist-${list}.json`, JSON.stringify(entries, null, 2), "utf8");
  }
}

// create data directory if it doesn't exist
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

fetchAll().then(() => {
  console.log("Done.");
}).catch((error) => {
  console.error("Error:", error);
});
