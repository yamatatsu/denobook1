import { BufReader, BufWriter } from '../../deno_std/io/bufio.ts'

const { listen, EOF } = Deno;

http_server();

async function readLine(bufReader: BufReader): Promise<string> {
  const result = await bufReader.readLine()
  if (result === EOF) {
    throw EOF
  }
  return new TextDecoder().decode(result.line)
}

async function http_server() {
  const listener = listen({
    port: 8888,
    hostname: "127.0.0.1",
    transport: "tcp",
  });
  const conn = await listener.accept();

  const bufReader = new BufReader(conn);
  const bufWriter = new BufWriter(conn);
  const encoder = new TextEncoder();

  const requestLine = await readLine(bufReader)
  const [_, method, pathname, version] = requestLine.match(/^([^ ]+)? ([^ ]+?) ([^ ]+?)$/)

  let headerLine: string;
  const requestHeaders = new Headers()
  while ((headerLine = await readLine(bufReader)).length > 0) {
    const [key, val] = headerLine.split(":").map(s => s.trim())
    requestHeaders.set(key, val)
  }

  await bufWriter.write(encoder.encode('HTTP/1.1 200 OK\r\n'))

  const responseBody = encoder.encode("Hello!")
  const responseHeaders = new Headers({
    "Content-Type": "text/plain",
    "Content-Length": responseBody.byteLength.toString()
  })
  for (const [key, val] of responseHeaders.entries()) {
    await bufWriter.write(encoder.encode(`${key}: ${val}\r\n`))
  }
  await bufWriter.write(encoder.encode('\r\n'))

  await bufWriter.write(responseBody)
  await bufWriter.flush()
  conn.close()
}
