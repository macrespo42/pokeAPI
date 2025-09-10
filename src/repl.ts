import process from "node:process";
import * as readline from "node:readline";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0);
}

export function startREPL(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "pokedex> ",
  });
  rl.prompt();
  rl.on("line", (rawInput) => {
    const input = cleanInput(rawInput);
    if (input.length > 0) {
      console.log(`Your command was: ${input[0]}`);
    }
    rl.prompt();
  });
}
