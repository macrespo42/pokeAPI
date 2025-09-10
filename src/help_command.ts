import type { CLICommand } from "./CLI_command.js";

export function commandHelp(command: Record<string, CLICommand>): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log("");

  for (const key in command) {
    const currCommand = command[key];
    console.log(`${currCommand.name}: ${currCommand.description}`);
  }
}
