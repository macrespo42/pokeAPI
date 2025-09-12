import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static cache = new Cache(5 * 1000 * 60); // 5min

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = pageURL || `${PokeAPI.baseURL}/location-area`;

    const cached: ShallowLocations | undefined = PokeAPI.cache.get(fullURL);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(fullURL);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const locations = await response.json();
      PokeAPI.cache.add(fullURL, locations);
      return locations as ShallowLocations;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error when fetching ${fullURL}: ${error.message}`);
      }
      throw new Error(`Error when fetching ${fullURL}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/${locationName}`;

    const cached: Location | undefined = PokeAPI.cache.get(fullURL);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(fullURL);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const location = await response.json();
      PokeAPI.cache.add(fullURL, location);
      return location as Location;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error when fetching ${fullURL}: ${error.message}`);
      }
      throw new Error(`Error when fetching ${fullURL}`);
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
