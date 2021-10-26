import { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class ResponseError extends Error {
  public response: AxiosResponse

  public config: AxiosRequestConfig

  public request: any

  public code?: string | number

  constructor(response: AxiosResponse) {
    super(response.data.message);
    this.response = response;
    this.config = response.config;
    this.request = response.request;
    this.code = response.data.code;
  }
}
