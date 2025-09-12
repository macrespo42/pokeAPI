import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0);
}

export async function startREPL(state: State): Promise<void> {
  state.readline.prompt();
  state.readline.on("line", async (rawInput) => {
    const input = cleanInput(rawInput);
    if (input.length > 0) {
      const command = state.commands[input[0]];
      if (!command) {
        console.log("Unknown command");
      }
      try {
        await command.callback(state);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`);
        } else {
          console.error("Unknown error");
        }
      }
    }
    state.readline.prompt();
  });
}
