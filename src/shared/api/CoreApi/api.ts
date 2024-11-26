import axios from 'axios';
import { API_KEY, API_URl } from '../../config';

export const $api = axios.create({
  baseURL: API_URl,
  responseType: 'json',
});

$api.interceptors.request.use((config) => {
  return { ...config, params: { ...config.params, key: API_KEY } };
});
