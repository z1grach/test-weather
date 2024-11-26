import { makeAutoObservable } from 'mobx';

/* @ts-ignore */ /* eslint-disable-next-line import/no-extraneous-dependencies */
import crypto from 'crypto-js';

export interface ISavedLocation {
  id: string;
  name: string;
  country: string;
}

const initialLocation = () => {
  const data = localStorage.getItem('locations');

  if (!data) return [];

  return JSON.parse(data);
};

const initialCacheSearch = () => {
  const data = localStorage.getItem('cacheSearch');

  if (!data) return {};

  return JSON.parse(data);
};

const initialHashSearch = () => {
  const data = localStorage.getItem('hashSearch');

  if (!data) return {};

  return JSON.parse(data);
};

export class CoreStore<T> {
  rootStore: T;

  isMobile = false;

  savedLocations: ISavedLocation[] = initialLocation();

  cacheSearch: Record<string, string> = initialCacheSearch();

  hashSearch: Record<string, object> = initialHashSearch();

  constructor(rootStore: T) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setCacheSearch(str: string, data: object) {
    const json = JSON.stringify(data);
    const hash = crypto.MD5(json).toString();

    this.cacheSearch[str] = hash;
    this.hashSearch[hash] = data;

    localStorage.setItem('cacheSearch', JSON.stringify(this.cacheSearch));
    localStorage.setItem('hashSearch', JSON.stringify(this.hashSearch));
  }

  addSavedLocation(data: ISavedLocation) {
    const idx = this.savedLocations.findIndex((item) => item.id === data.id);

    if (idx !== -1) return;

    this.savedLocations.push(data);

    localStorage.setItem('locations', JSON.stringify(this.savedLocations));
  }

  deleteSavedLocation(id: string) {
    this.savedLocations = this.savedLocations.filter((item) => item.id !== id);

    localStorage.setItem('locations', JSON.stringify(this.savedLocations));
  }

  setIsMobile(data: boolean) {
    this.isMobile = data;
  }
}
