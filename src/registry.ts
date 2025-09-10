import { commandExit } from "./exit_command.js";
import type { CLICommand } from "./CLI_command.js";
import { commandHelp } from "./help_command.js";

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
  };
}
