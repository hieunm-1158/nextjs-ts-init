import { type StateCreator } from 'zustand';

export type ICountStore = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

export const countStoreCreator: StateCreator<ICountStore> = set => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
  decrease: () => set(state => ({ count: state.count - 1 })),
});
