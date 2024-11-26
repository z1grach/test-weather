import { AxiosResponse } from 'axios';

export class ApiRequest<T = any> {
  constructor(
    private _request: () => Promise<AxiosResponse<T>>,
    private _controller: AbortController,
  ) {}

  public abort(): void {
    this._controller.abort();
  }

  public async fetch(): Promise<AxiosResponse<T>> {
    return this._request();
  }
}
