import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (!args.length) {
    throw new Error("No area to explore gived");
  }

  const locationInfo = await state.api.fetchLocation(args[0]);
  console.log(`Exploring ${args[0]}...`);
  console.log("Found Pokemon:");
  for (let i = 0; i < locationInfo.pokemon_encounters.length; i++) {
    console.log("-", locationInfo.pokemon_encounters[i].pokemon.name);
  }
}
