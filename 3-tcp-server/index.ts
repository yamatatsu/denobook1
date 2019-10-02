const { listen, EOF } = Deno;

echo_server();

async function echo_server() {
  const listener = listen({
    port: 8888,
    hostname: "127.0.0.1",
    transport: "tcp",
  });
  const conn = await listener.accept();
  const buf = new Uint8Array(1024);
  const nreadOrEof = await conn.read(buf);
  if (nreadOrEof === EOF) {
    throw EOF;
  }
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  console.log(decoder.decode(buf.slice(0, nreadOrEof)))
  await conn.write(encoder.encode('hello! hello!'));
  conn.close();
  listener.close()
}
