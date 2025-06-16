# Cambridge-Quizlet

Export wordlists from the [Cambridge Dictionary](https://dictionary.cambridge.org/) to [Quizlet](https://quizlet.com/) cards.

## How to use

Go to word lists. For example, you can use community lists from here: [https://dictionary.cambridge.org/plus/wordlist#allWordlists](https://dictionary.cambridge.org/plus/wordlist#allWordlists).

Choose one, such as this: [https://dictionary.cambridge.org/plus/wordlist/21826933\_using-computers](https://dictionary.cambridge.org/plus/wordlist/21826933_using-computers). You will see the list ID in the URL — in this case, it's `21826933`.

To prepare the lists for export to Quizlet, follow these steps:

- Specify the list IDs in the `wordlists.ts` file.
- Run the script `bun run fetch`. I will create fetch wordlists json files and save as `data/wordlist-id.json`.
- To convert the JSON files into a format suitable for Quizlet import (each card delimited by a new line, term and definition are separated by a tab), use the script `bun run convert`. It will create files `data/wordlist-id.txt`, which can be imported into Quizlet.
