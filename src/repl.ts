import process from "node:process";
import * as readline from "node:readline";
import { getCommands } from "./registry.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0);
}

export function startREPL(): void {
  const commands = getCommands();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "pokedex> ",
  });
  rl.prompt();
  rl.on("line", (rawInput) => {
    const input = cleanInput(rawInput);
    if (input.length > 0) {
      const command = commands[input[0]];
      if (!command) {
        console.log("Unknown command");
      }
      command.callback(commands);
    }
    rl.prompt();
  });
}
