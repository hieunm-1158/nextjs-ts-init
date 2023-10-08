import { IUser } from '@/typings/user.type';

export type IUserStore = {
  currentUser: IUser;
  setCurrentUser: (currentUser: IUser) => void;
};

export const userSlice = (
  set: (fn: (state: IUserStore) => IUserStore | Partial<IUserStore>) => void,
) => ({
  currentUser: {
    id: 0,
    email: '',
    age: 0,
  },
  setCurrentUser: (currentUser: IUser) => set(() => ({ currentUser })),
});
