import { createContext, useContext, useLayoutEffect } from 'react';
import { createStore } from 'zustand';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { devtools } from 'zustand/middleware';

import { ICountStore, counterSlice } from './slice/counterSlice';
import { IUserStore, userSlice } from './slice/userSlice';

/**
 * StoreProps
 * - Contains data & values.
 * - Does not contain any actions. (they come in StoreState)
 */
export type StoreState = ICountStore & IUserStore;

type InitProps = Partial<StoreState>;

type RootStore = ReturnType<typeof initStoreForGSSP>;

export const RootStoreContext = createContext<RootStore | null>(null);

/**
 * initStoreForGSSP (Used within getServerSideProps)
 *
 * Initialize the store for use in `createRootStore` function below.
 * - This returns all the defaultState and actions.
 * - We can also pass `initProps` to this function if we are calling `initStoreForGSSP` in getServerSideProps.
 * For example doing a get request.
 */
export const initStoreForGSSP = (initProps?: InitProps) => {
  // Main Store Functions
  return createStore<StoreState>()(
    devtools(set => ({
      ...counterSlice(set),
      ...userSlice(set),
      ...initProps,
    })),
  );
};

/**
 * Define store that you can reusue throughout requests.
 */
let store: RootStore;

/**
 * `useCreateStore` which is used within `_app.tsx` to pass down to the Provider.
 */
export const useCreateStore = (initProps?: InitProps) => {
  // Server side code: For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initStoreForGSSP(initProps);
  }

  // Client side code:
  // Next.js always re-uses same store regardless of whether page is a SSR or SSG or CSR type.
  const isReusingStore = Boolean(store);

  store = store ?? initStoreForGSSP(initProps);
  // When next.js re-renders _app while re-using an older store, then replace current state with
  // the new state (in the next render cycle).
  // (Why next render cycle? Because react cannot re-render while a render is already in progress.
  // i.e. we cannot do a setState() as that will initiate a re-render)
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment (i.e. client or server)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (initProps && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          ...initProps,
        },
        true, // replace states, rather than shallow merging
      );
    }
  });

  return () => store;
};

/**
 * Client Only.
 */
export const useRootStoreContext = <T>(
  selector: (state: StoreState) => T,
  equalityFn?: (left: T, right: T) => boolean,
) => {
  const store = useContext(RootStoreContext);
  if (!store) throw new Error('Missing RootStoreContext.Provider in the tree');
  return useStoreWithEqualityFn(store, selector, equalityFn);
};
