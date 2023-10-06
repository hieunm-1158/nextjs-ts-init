import { produce } from 'immer';

export type ICountStore = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

export const counterSlice = (
  set: (fn: (state: ICountStore) => ICountStore | Partial<ICountStore>) => void,
) => ({
  count: 0,
  increase: () =>
    set(
      produce((state: ICountStore) => {
        ++state.count;
      }),
    ),
  decrease: () =>
    set(
      produce(state => {
        --state.count;
      }),
    ),
});
