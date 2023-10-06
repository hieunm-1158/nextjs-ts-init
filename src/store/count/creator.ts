import { type StateCreator } from 'zustand';
import { produce } from 'immer';

export type ICountStore = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

export const countStoreCreator: StateCreator<ICountStore> = set => ({
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
