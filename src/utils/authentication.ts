import { IUser } from '@/typings/user.type';

import http from './http';

export const authentication = async () => {
  const user = await http.get<IUser>('users/1');
  return user.data;
};
