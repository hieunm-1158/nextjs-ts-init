import axios, { AxiosError, type AxiosInstance } from 'axios';
import { stringify } from 'qs';

import { AuthResponse, RefreshTokenReponse } from '@/typings/auth.type';
import storageKeys from '@/constants/storageKeys';
import HttpStatusCode from '@/constants/httpStatus';
import { ErrorResponse } from '@/typings/axios.type';
import {
  URL_LOGIN,
  URL_LOGOUT,
  URL_REFRESH_TOKEN,
} from '@/services/authService.api';

import tokenStorage from './tokenStorage';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const mapEmptyArray = (a: any): any | null[] =>
  Array.isArray(a) && !a.length ? [null] : a;

const isClient = typeof window !== 'undefined';

export class Http {
  instance: AxiosInstance;

  private accessToken: string;

  private refreshToken: string;

  constructor() {
    this.accessToken =
      (isClient && tokenStorage.get(storageKeys.ACCESS_TOKEN)) || '';
    this.refreshToken =
      (isClient && tokenStorage.get(storageKeys.REFRESH_TOKEN)) || '';
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL as string,
      withCredentials: false,
      timeout: 60000,
      paramsSerializer: {
        serialize: (params: Record<string, unknown>) =>
          stringify(params, {
            arrayFormat: 'comma',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            filter: (_prefix, v) => mapEmptyArray(v),
          }),
      },
    });
    this.instance.interceptors.request.use(
      config => {
        if (isClient && this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    // Add a response interceptor
    this.instance.interceptors.response.use(
      response => {
        const { url } = response.config;
        if (isClient && url === URL_LOGIN) {
          const data = response.data as AuthResponse;
          this.accessToken = data.data.access_token;
          this.refreshToken = data.data.refresh_token;
          tokenStorage.set({
            key: storageKeys.ACCESS_TOKEN,
            value: data.data.access_token,
          });
          tokenStorage.set({
            key: storageKeys.REFRESH_TOKEN,
            value: data.data.refresh_token,
          });
        } else if (url === URL_LOGOUT) {
          this.accessToken = '';
          this.refreshToken = '';
          tokenStorage.remove([
            storageKeys.ACCESS_TOKEN,
            storageKeys.REFRESH_TOKEN,
          ]);
        }
        return response;
      },
      async (error: AxiosError) => {
        //NOTE: When Error 401
        if (
          isClient &&
          error.response?.status === HttpStatusCode.Unauthorized
        ) {
          const config = error.response?.config || { headers: {}, url: '' };
          const { url } = config;
          //NOTE: Token is expired and url isn't refresh_token
          if (
            (
              error.response?.data as ErrorResponse<{
                name: string;
                message: string;
              }>
            ).data?.message === 'EXPIRED_TOKEN' &&
            url !== URL_REFRESH_TOKEN
          ) {
            return this.handleRefreshToken().then(access_token => {
              // NOTE: Continue call api
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: access_token },
              });
            });
          }
          tokenStorage.remove([
            storageKeys.ACCESS_TOKEN,
            storageKeys.REFRESH_TOKEN,
          ]);
          this.accessToken = '';
          this.refreshToken = '';
        }
        return Promise.reject(error);
      },
    );
  }

  private async handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken,
      })
      .then(res => {
        const { access_token: accessToken } = res.data.data;
        tokenStorage.set({ key: storageKeys.ACCESS_TOKEN, value: accessToken });
        this.accessToken = accessToken;
        return accessToken;
      })
      .catch(error => {
        tokenStorage.remove([
          storageKeys.ACCESS_TOKEN,
          storageKeys.REFRESH_TOKEN,
        ]);
        this.accessToken = '';
        this.refreshToken = '';
        throw error;
      });
  }
}
const http = new Http().instance;
export default http;
