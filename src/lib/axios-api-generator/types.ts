import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    /**
     * 接口所需的数据源，会分解成 { pathVariables, data, params, headers } 并合并到config；
     * 默认策略为优先匹配 url 里的插值模板以生成 pathVariables，未用到的键值对根据 method 生成为 data 或 params；
     * 搭配 api.defaults.payloadResolver 使用，可以更加灵活地控制分解过程；
     */
    payload?: any;
    /**
     * 需要注入到url的变量，{ url: '/users/:id/friends', pathVariables: { id: 123 } } => { url: /users/:id/friends }
     */
    pathVariables?: { [key: string]: any };
  }
}

export type DataSources = Pick<AxiosRequestConfig, 'data' | 'params' | 'pathVariables' | 'headers'>

export type PayloadResolver<T> = (payload: T) => DataSources

export interface Api<Input = any, Output = any> {
  (payload: Input, config?: AxiosRequestConfig): Promise<Output>;
  clone(defaults?: AxiosRequestConfig): Api<Input, Output>;
  clear(): void;
  getUri(payload: Input, config?: AxiosRequestConfig): string;
}

export type ApiOutput<T> = T extends Api<infer K, infer P> ? P : unknown
