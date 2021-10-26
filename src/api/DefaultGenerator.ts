import axios from 'axios';
import { Message } from 'element-ui';
import ApiGenerator from '@/lib/axios-api-generator';
import store from '@/store';
import ResponseError from './ResponseError';

declare module 'axios' {
  interface AxiosRequestConfig {
    silent?: boolean;
    normalizeResponse?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: true,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use((res) => {
  const { data, config } = res;

  // set normalizeResponse to false to support json or other files
  if (data && 'status' in data && config.normalizeResponse) {
    if (data.status !== true) {
      throw new ResponseError(res);
    }
    if (!data.data) {
      return data;
    }
    return data.data;
  }
  return data;
});

axiosInstance.interceptors.response.use(undefined, (err) => {
  if (err.config) {
    if (CodeInterceptors[err.code]) {
      return CodeInterceptors[err.code](err);
    }
    if (!err.config.silent) {
      Message.error(err.message);
    }
  }
  throw err;
});

const CodeTypes = {
  UNAUTHORIZED: 0,
};

const CodeInterceptors: { [code: string]: (err: ResponseError) => any } = {
  [CodeTypes.UNAUTHORIZED]: (err) => {
    Message.error(err.message);
    store.dispatch('logout', true);
  },
};

export default new ApiGenerator(axiosInstance, {
  silent: false,
  normalizeResponse: true,
});
