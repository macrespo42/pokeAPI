import { commandExit } from "./exit_command.js";
import type { CLICommand } from "./state.js";
import { commandHelp } from "./help_command.js";
import { commandMap, commandMapb } from "./map_command.js";
import { commandExplore } from "./explore_command.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Display a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Display 20 next location area",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Display 20 previous location area",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Explore a specified location area",
      callback: commandExplore,
    },
  };
}
