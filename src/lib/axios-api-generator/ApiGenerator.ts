import {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import merge from 'lodash/merge';
import {
  resolveURLs,
  isUndef,
} from './utils';
import createApi from './createApi';
import {
  Api,
  PayloadResolver,
} from './types';

interface CreateApiShortcut {
  <I = void, O = void>(url?: string, defaults?: AxiosRequestConfig, payloadResolver?: PayloadResolver<I>): Api<I, O>;
  <I = void, O = void>(url: string, payloadResolver: PayloadResolver<I>): Api<I, O>;
  <I = void, O = void>(defaults: AxiosRequestConfig, payloadResolver?: PayloadResolver<I>): Api<I, O>;
  <I = void, O = void>(payloadResolver: PayloadResolver<I>): Api<I, O>;
}

export default class ApiGenerator {
  public readonly axiosInstance: AxiosInstance

  public readonly defaults?: AxiosRequestConfig

  public readonly prefixUrl: string

  public readonly get!: CreateApiShortcut

  public readonly delete!: CreateApiShortcut

  public readonly head!: CreateApiShortcut

  public readonly post!: CreateApiShortcut

  public readonly put!: CreateApiShortcut

  public readonly patch!: CreateApiShortcut

  constructor(axiosInstance: AxiosInstance, defaults?: AxiosRequestConfig, prefixUrl = '') {
    this.axiosInstance = axiosInstance;
    this.defaults = defaults;
    this.prefixUrl = prefixUrl;
  }

  public prefix(prefixUrl = ''): ApiGenerator {
    return new ApiGenerator(this.axiosInstance, this.defaults, this.prefixUrl + prefixUrl);
  }

  public clone(defaults?: AxiosRequestConfig): ApiGenerator {
    return new ApiGenerator(this.axiosInstance, merge({}, this.defaults, defaults), this.prefixUrl);
  }
}

['delete', 'get', 'head', 'post', 'put', 'patch'].forEach((method) => {
  // @ts-ignore
  ApiGenerator.prototype[method] = function createApiShortcut<I, O>(
    this: ApiGenerator,
    url?: string | AxiosRequestConfig | PayloadResolver<I>,
    defaults?: AxiosRequestConfig | PayloadResolver<I>,
    payloadResolver?: PayloadResolver<I>,
  ): Api<I, O> {
    if (typeof url === 'function') {
      payloadResolver = url;
      url = defaults = undefined;
    } else if (typeof url === 'object') {
      payloadResolver = typeof defaults === 'function' ? defaults : undefined;
      defaults = url;
      url = undefined;
    } else if (typeof defaults === 'function') {
      payloadResolver = defaults;
      defaults = undefined;
    }
    if (isUndef(url)) {
      url = (defaults && defaults.url) || '';
    }
    url = resolveURLs(this.prefixUrl, url);
    defaults = merge({}, this.defaults, defaults);
    return createApi<I, O>(this.axiosInstance, method as string, url, defaults, payloadResolver);
  };
});
