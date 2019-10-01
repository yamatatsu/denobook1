console.log("exec in 2-4 dir !!!");

const { open, copy, stdout } = Deno;

const fileNames = ["a.txt", "b.txt", "c.txt"];

// 早すぎてどのみち標準出力が混ざることはなかった

// fileNames.forEach(f => open(f).then(src => copy(stdout, src)));

fileNames.reduce(
  (promise: Promise<number>, f) =>
    promise
      .then(() => open(f))
      .then(src => copy(stdout, src).finally(() => src.close())),
  Promise.resolve(0)
);
