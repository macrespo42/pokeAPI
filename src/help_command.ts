import type { State } from "./state.js";

export function commandHelp(state: State): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log("");

  for (const key in state.commands) {
    const currCommand = state.commands[key];
    console.log(`${currCommand.name}: ${currCommand.description}`);
  }
}
