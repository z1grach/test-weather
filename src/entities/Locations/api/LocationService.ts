import { AxiosRequestConfig } from 'axios';
import { ApiCaller } from '../../../shared/api/CoreApi';
import { ILocation } from '../types';

export class LocationService {
  public static getLocations(q: string, config?: AxiosRequestConfig) {
    return new ApiCaller().get<ILocation[]>(`/search.json`, {
      ...config,
      params: { q },
    });
  }
}
