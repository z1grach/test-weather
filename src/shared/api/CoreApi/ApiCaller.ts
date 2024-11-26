import { AxiosRequestConfig } from 'axios';
import { $api } from './api';
import { ApiRequest } from './ApiRequest';

export class ApiCaller {
  get<T = any>(url: string, cfg?: AxiosRequestConfig): ApiRequest<T> {
    const controller = new AbortController();
    const request: any = $api.get.bind(this, url, {
      ...cfg,
      signal: controller.signal,
    });

    return new ApiRequest<T>(request, controller);
  }

  post<T = any>(
    url: string,
    body: any,
    cfg?: AxiosRequestConfig,
  ): ApiRequest<T> {
    const controller = new AbortController();
    const request: any = $api.post.bind(this, url, body, {
      ...cfg,
      signal: controller.signal,
    });

    return new ApiRequest<T>(request, controller);
  }

  put<T = any>(
    url: string,
    data: any,
    cfg?: AxiosRequestConfig,
  ): ApiRequest<T> {
    const controller = new AbortController();
    const request: any = $api.put.bind(this, url, data, {
      ...cfg,
      signal: controller.signal,
    });

    return new ApiRequest<T>(request, controller);
  }

  delete<T = any>(url: string, cfg?: AxiosRequestConfig): ApiRequest<T> {
    const controller = new AbortController();
    const request: any = $api.delete.bind(this, url, {
      ...cfg,
      signal: controller.signal,
    });

    return new ApiRequest<T>(request, controller);
  }
}
