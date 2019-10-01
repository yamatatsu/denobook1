const { copy, stdout } = Deno;

const enc = new TextEncoder();
const buf = new Deno.Buffer();

["hello, ", "deno ", "world!"]
  .map(enc.encode)
  .reduce(
    (p: Promise<void>, w) =>
      p.then(() => {
        buf.write(w);
      }),
    Promise.resolve()
  )
  .then(() => copy(stdout, buf));
