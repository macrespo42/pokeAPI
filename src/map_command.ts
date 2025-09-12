import type { State } from "./state.js";

export async function commandMap(state: State) {
  const locations = await state.api.fetchLocations(state.nextLocationURL);
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

  const locations = await state.api.fetchLocations(state.prevLocationURL);
  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;

  for (let i = 0; i < locations.results.length; i++) {
    console.log(locations.results[i].name);
  }
}
