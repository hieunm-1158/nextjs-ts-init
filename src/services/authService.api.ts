import { AuthResponse } from '@/typings/auth.type';
import http from 'src/utils/http';

export const URL_LOGIN = 'login';
export const URL_LOGOUT = 'logout';
export const URL_REFRESH_TOKEN = 'refresh-access-token';

const authApi = {
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body);
  },
  logout() {
    return http.post(URL_LOGOUT);
  },
};

export default authApi;
