import axios, {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  Method,
} from 'axios';
import * as qs from 'qs';

export const sendRequest = async (
  method: Method,
  headers: AxiosRequestHeaders,
  url: string,
  dataRes: any,
): Promise<AxiosPromise> => {
  const data = method === 'post' ? qs.stringify(dataRes) : dataRes;
  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
  };

  return axios(config);
};
