import { createInterface, Interface } from "readline";
import { getCommands } from "./registry.js";
import process from "node:process";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type State = {
  commands: Record<string, CLICommand>;
  readline: Interface;
  api: PokeAPI;
  nextLocationURL: string;
  prevLocationURL: string;
  pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState() {
  const commands = getCommands();
  const state: State = {
    commands,
    readline: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "pokedex> ",
    }),
    api: new PokeAPI(),
    nextLocationURL: "",
    prevLocationURL: "",
    pokedex: {},
  };
  return state;
}
