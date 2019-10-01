console.log("exec in 2-2 dir !!!");

const { open, copy, stdout } = Deno;

open("example.txt").then(src => copy(stdout, src));
