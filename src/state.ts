import { createInterface, Interface } from "readline";
import { getCommands } from "./registry.js";
import process from "node:process";

export type State = {
  commands: Record<string, CLICommand>;
  readline: Interface;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export function initState() {
  const commands = getCommands();
  return {
    commands,
    readline: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "pokedex> ",
    }),
  };
}
