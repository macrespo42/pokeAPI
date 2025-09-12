export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = pageURL || `${PokeAPI.baseURL}/location-area`;
    try {
      const response = await fetch(fullURL);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const locations = await response.json();
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
    try {
      const response = await fetch(fullURL);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const location = await response.json();
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
  // to implement
};
