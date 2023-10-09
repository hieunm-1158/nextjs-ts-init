import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { appWithTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { RootStoreContext, StoreState, useCreateStore } from '@/store';
import { chains } from '@/constants/chain';

const projectId = process.env.NEXT_PUBLIC_PROJECT_WALLET_CONNECT_ID ?? '';
const alchemyAPIKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? '';

const { publicClient, webSocketPublicClient } = configureChains(chains, [
  alchemyProvider({ apiKey: alchemyAPIKey }),
  publicProvider(),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

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
      <SWRConfig
        value={{
          revalidateOnMount: true,
        }}
      >
        <WagmiConfig config={wagmiConfig}>
          {getLayout(<Component {...pageProps} />)}
        </WagmiConfig>
      </SWRConfig>
    </RootStoreContext.Provider>
  );
}

export default appWithTranslation(App);
