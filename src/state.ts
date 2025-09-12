import { createInterface, Interface } from "readline";
import { getCommands } from "./registry.js";
import process from "node:process";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type State = {
  commands: Record<string, CLICommand>;
  readline: Interface;
  api: PokeAPI;
  nextLocationURL: string;
  prevLocationURL: string;
  cache: Cache;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
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
    cache: new Cache(5 * 1000 * 60), // 5min
  };
  return state;
}
