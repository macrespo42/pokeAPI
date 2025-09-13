import type { State } from "./state.js";

function catchPokemon(baseExp: number) {
  const difficulty = Math.min(baseExp / 600, 1);
  const catchRate = 1 - difficulty;

  return Math.random() < catchRate;
}

export async function commandCatch(state: State, ...args: string[]) {
  if (!args.length) {
    throw new Error("No pokemon to catch ?");
  }

  const pokemon = await state.api.fetchPokemon(args[0]);
  console.log(`Throwing a Pokeball at ${pokemon.name}...`);
  if (catchPokemon(pokemon.base_experience)) {
    console.log(`${pokemon.name} was caught!`);
    state.pokedex[pokemon.name] = pokemon;
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}
