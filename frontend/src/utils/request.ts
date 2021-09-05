import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { getAuthData } from './storage';

export const BASE_URL =
  process.env.REACT_APP_CLIENT_ID ?? 'http://localhost:8080';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dotmovieflix';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dotmovieflix123';


type LoginData = {
  username: string;
  password: string;
};

const basicHeader = () =>
  'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicHeader(),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : config.headers;
  return axios({ ...config, baseURL: BASE_URL, headers });
};

