import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main(): Promise<void> {
  const state = initState();
  await startREPL(state);
}

main();
