export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval?: number) {
    this.#interval = interval || 100;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const cacheEntry: CacheEntry<T> = {
      createdAt: Date.now(),
      val,
    };
    this.#cache.set(key, cacheEntry);
  }

  get<T>(key: string) {
    const entry = this.#cache.get(key);
    return entry?.val as T;
  }

  #reap() {
    for (const [key] of this.#cache) {
      const current = this.#cache.get(key);
      if (current && current.createdAt < Date.now() - this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
  }
}
