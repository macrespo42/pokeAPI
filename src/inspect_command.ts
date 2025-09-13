import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
  if (!args.length) {
    throw new Error("No pokemon to inspect ? ");
  }

  const pokemon = await state.api.fetchPokemon(args[0]);
  if (!state.pokedex[pokemon.name]) {
    console.log("you have not caught that pokemon");
  } else {
    console.log("Name:", pokemon.name);
    console.log("Height:", pokemon.height);
    console.log("Weight:", pokemon.weight);
    console.log("Stats:");
    for (let i = 0; i < pokemon.stats.length; i++) {
      const curr = pokemon.stats[i];
      console.log(`  -${curr.stat.name}: ${curr.base_stat}`);
    }

    console.log("Types:");
    for (let i = 0; i < pokemon.types.length; i++) {
      const curr = pokemon.types[i];
      console.log(`  -${curr.type.name}`);
    }
  }
}
