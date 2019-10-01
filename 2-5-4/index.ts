const { open, copy, stdout } = Deno;

import {
  StringReader,
  MultiReader
} from "https://deno.land/std@v0.19.0/io/readers.ts";

Promise.all(["header.txt", "footer.txt"].map(name => open(name))).then(
  ([header, footer]) =>
    copy(stdout, new MultiReader(header, new StringReader("hogeeee\n"), footer))
);
