const { open, copy, readAll, stdout } = Deno;

class FileCache {
  cache: { [path: string]: Uint8Array } = {};

  async store(path: string) {
    console.log(`store: ${path}`);
    const f = await open(path);
    const bytes = await readAll(f);
    f.close();
    this.cache[path] = bytes;
  }

  async load(path: string): Promise<Deno.Reader> {
    const bytes = this.cache[path];
    if (!bytes) {
      await this.store(path);
      return this.load(path);
    }
    return new Deno.Buffer(bytes);
  }
}

const fc = new FileCache();
fc.load("index.html").then(() => {
  fc.load("index.html").then(str => copy(stdout, str));
});
