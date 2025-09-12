import { createInterface, Interface } from "readline";
import { getCommands } from "./registry.js";
import process from "node:process";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  commands: Record<string, CLICommand>;
  readline: Interface;
  api: PokeAPI;
  nextLocationURL: string;
  prevLocationURL: string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
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
    api: new PokeAPI(),
    nextLocationURL: "",
    prevLocationURL: "",
  };
}
