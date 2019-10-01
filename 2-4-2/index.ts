console.log("exec in this dir !!!");

const { open, copy } = Deno;

Promise.all([open("denoland.html", "w+"), fetch("https://deno.land")]).then(
  ([f, res]) => copy(f, res.body).finally(() => f.close())
);
