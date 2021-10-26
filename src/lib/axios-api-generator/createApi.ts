import {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isPlainObject from 'lodash/isPlainObject';
import {
  compileURLTemplate,
  hasRequestBody,
  parseURLTemplate,
} from './utils';
import {
  Api,
  DataSources,
  PayloadResolver,
} from './types';

export default function createApi<Input, Output>(
  axiosInstance: AxiosInstance,
  method: string,
  url: string,
  defaults?: AxiosRequestConfig,
  payloadResolver?: PayloadResolver<Input>,
): Api<Input, Output> {
  const context = new ApiRequest<Input, Output>(axiosInstance, method, url, defaults, payloadResolver);
  const instance = ApiRequest.prototype.request.bind(context);
  for (const fn of Object.getOwnPropertyNames(ApiRequest.prototype)) {
    // @ts-ignore
    instance[fn] = ApiRequest.prototype[fn].bind(context);
  }
  for (const attr of Object.keys(context)) {
    // @ts-ignore
    instance[attr] = context[attr];
  }
  // @ts-ignore
  return instance;
}

class ApiRequest<Input, Output> {
  private axiosInstance: AxiosInstance

  private method: string

  private url: string

  private defaults: AxiosRequestConfig

  private payloadResolver?: PayloadResolver<Input>

  private handUpPendingRequest: { [key: string]: () => void } = Object.create(null)

  constructor(
    axiosInstance: AxiosInstance,
    method: string,
    url: string,
    defaults?: AxiosRequestConfig,
    payloadResolver?: PayloadResolver<Input>,
  ) {
    this.axiosInstance = axiosInstance;
    this.method = method;
    this.url = url;
    this.defaults = defaults || {};
    this.payloadResolver = payloadResolver;
  }

  /**
   * @param payload 会与config.payload合并
   */
  public request(payload: Input, config?: AxiosRequestConfig): Promise<Output> {
    return this.axiosInstance.request(this.normalizeConfig(payload, config));
  }

  public clone(defaults?: AxiosRequestConfig): Api<Input, Output> {
    return createApi(this.axiosInstance, this.method, this.url, merge({}, this.defaults, defaults), this.payloadResolver);
  }

  public clear(): void {
    Object.values(this.handUpPendingRequest).forEach((cancel) => cancel());
  }

  public getUri(payload: Input, config?: AxiosRequestConfig): string {
    config = this.normalizeConfig(payload, config);
    return this.axiosInstance.getUri(config);
  }

  private normalizeConfig(payload: Input, config: AxiosRequestConfig = {}): AxiosRequestConfig {
    const {
      url,
      method,
    } = this;
    const finalConfig = merge({}, this.defaults, config, { payload, url, method });
    const finalPayload = finalConfig.payload;
    // resolve payload
    if (finalPayload) {
      let dataSources: DataSources;
      if (this.payloadResolver) {
        dataSources = this.payloadResolver(finalPayload);
      } else {
        const type = hasRequestBody(method!) ? 'data' : 'params';
        if (isPlainObject(finalPayload)) {
          const pathVariablesKeys = parseURLTemplate(url);
          dataSources = {
            pathVariables: pick(finalPayload, pathVariablesKeys),
            [type]: omit(finalPayload, pathVariablesKeys),
          };
        } else {
          dataSources = {
            [type]: finalPayload,
          };
        }
      }
      merge(finalConfig, dataSources);
    }
    // resolve url template
    if (isPlainObject(finalConfig.pathVariables)) {
      finalConfig.url = compileURLTemplate(url, finalConfig.pathVariables!);
    }
    return finalConfig;
  }
}
