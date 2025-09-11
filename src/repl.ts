import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0);
}

export function startREPL(state: State): void {
  state.readline.prompt();
  state.readline.on("line", (rawInput) => {
    const input = cleanInput(rawInput);
    if (input.length > 0) {
      const command = state.commands[input[0]];
      if (!command) {
        console.log("Unknown command");
      }
      command.callback(state);
    }
    state.readline.prompt();
  });
}
