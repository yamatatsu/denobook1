console.log("exec in 2-4 dir !!!");

const { open, copy, stdout } = Deno;

open("example.txt").then(src => copy(stdout, src));
