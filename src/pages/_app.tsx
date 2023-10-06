import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { appWithTranslation } from 'next-i18next';

import { RootStoreContext, StoreState, useCreateStore } from '@/store';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { initialZustandState } = pageProps;
  const store = useCreateStore(
    initialZustandState as Partial<StoreState> | undefined,
  );
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <RootStoreContext.Provider value={store()}>
      {getLayout(<Component {...pageProps} />)}
    </RootStoreContext.Provider>
  );
}

export default appWithTranslation(App);
