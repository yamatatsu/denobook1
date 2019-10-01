const { open, copy, stdout } = Deno;

import { StringReader } from "https://deno.land/std@v0.19.0/io/readers.ts";

class LowercaseWriter {
  constructor(private readonly writer: Deno.Writer) {}

  async write(p: Uint8Array): Promise<number> {
    const buf = new Uint8Array(p.length)
    range(p.length).forEach(i => {
      if (p[i] >= 65 && p[i] <= 90) {
        buf[i] = p[i] + 32;
      } else {
        buf[i] = p[i]
      }
    });
    return this.writer.write(buf);
  }
}

const writer = new LowercaseWriter(stdout)
copy(writer, new StringReader('HOGEEEEEE123'))

function range(n: number) {
  return Array.from(Array(n), (_, k) => k);
}
