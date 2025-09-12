import type { State } from "./state.js";
import { ShallowLocations } from "./pokeapi.js";

export async function commandMap(state: State) {
  let locations: ShallowLocations | undefined = state.cache.get(
    state.nextLocationURL,
  );

  if (!locations) {
    locations = await state.api.fetchLocations(state.nextLocationURL);
    state.cache.add(state.nextLocationURL, locations);
  } else {
    console.log("using cache bru");
    console.log(JSON.stringify(locations));
  }

  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;

  for (let i = 0; i < locations?.results.length; i++) {
    console.log(locations.results[i].name);
  }
}

export async function commandMapb(state: State) {
  if (!state.prevLocationURL) {
    throw new Error("you're on the first page");
  }

  let locations: ShallowLocations | undefined = state.cache.get(
    state.prevLocationURL,
  );

  if (!locations) {
    locations = await state.api.fetchLocations(state.prevLocationURL);
    state.cache.add(state.prevLocationURL, locations);
  } else {
    console.log("using cache bru");
  }

  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;

  for (let i = 0; i < locations.results.length; i++) {
    console.log(locations.results[i].name);
  }
}
