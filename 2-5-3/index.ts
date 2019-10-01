const { open, copy } = Deno;

import { StringReader } from "https://deno.land/std@v0.19.0/io/readers.ts";

open("example.txt", "w+").then(f =>
  copy(f, new StringReader("hogeeee")).finally(() => f.close())
);
