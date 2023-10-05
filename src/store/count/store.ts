import { create } from 'zustand';

import { type ICountStore, countStoreCreator } from './creator';

export const useCountStore = create<ICountStore>()(countStoreCreator);
