const { dial, EOF } = Deno;

echo_client();

async function echo_client() {
  const conn = await dial({
    port: 8888,
    hostname: "127.0.0.1",
    transport: "tcp"
  });
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  await conn.write(encoder.encode("hello!"));
  const buf = new Uint8Array(1024);
  const nreadOrEof = await conn.read(buf);
  if (nreadOrEof === EOF) return;
  const reply = decoder.decode(buf.slice(0, nreadOrEof));
  console.log(reply);
}
