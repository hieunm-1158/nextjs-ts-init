export type IUser = {
  id: number;
  email: string;
  age: number;
};

export const authentication = async () => {
  const response = await fetch('https://dummyjson.com/users/1');
  const user: IUser = await response.json();

  return user;
};
