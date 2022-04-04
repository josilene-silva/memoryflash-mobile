import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.19:3333',
});

function setupAxiosToken(token: string) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export { api, setupAxiosToken };
