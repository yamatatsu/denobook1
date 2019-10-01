const { copy, stdout } = Deno;

import { StringReader } from "https://deno.land/std@v0.19.0/io/readers.ts";

class UppercaseReader {
  constructor(private readonly reader: Deno.Reader) {}

  async read(p: Uint8Array): Promise<number | Deno.EOF> {
    const nread = await this.reader.read(p);
    if (nread === Deno.EOF) {
      return Deno.EOF;
    }
    range(p.length).forEach(i => {
      if (p[i] >= 97 && p[i] <= 122) {
        p[i] -= 32;
      }
    });
    return nread;
  }
}

const reader = new UppercaseReader(new StringReader("hogeeee"));
copy(stdout, reader);

function range(n: number) {
  return Array.from(Array(n), (_, k) => k);
}
