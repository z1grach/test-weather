import { AxiosRequestConfig } from 'axios';
import { ApiCaller } from '../../../shared/api/CoreApi';
import { ICurrentWeather } from '../types';

export class WeatherService {
  public static getCurrentWeather(q: string, config?: AxiosRequestConfig) {
    return new ApiCaller().get<ICurrentWeather>(`/current.json`, {
      ...config,
      params: { q },
    });
  }
}
