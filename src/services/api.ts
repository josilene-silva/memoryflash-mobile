import axios from 'axios';

const api = axios.create({
  baseURL: 'https://memoryflash-api.herokuapp.com',
});

function setupAxiosToken(token: string) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export { api, setupAxiosToken };
