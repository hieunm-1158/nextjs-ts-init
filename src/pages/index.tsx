import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { shallow } from 'zustand/shallow';
import useSWR from 'swr';

import MainLayout from '@/layouts/MainLayout';
import { initStoreForGSSP, useRootStoreContext } from '@/store';
import { authentication } from '@/utils/authentication';
import { IProduct } from '@/typings/product.type';
import {
  getDetailProduct,
  getKeyDetailProduct,
} from '@/services/productService.api';

const HomePage = () => {
  const { count, increase, decrease, currentUser } = useRootStoreContext(
    state => state,
    shallow,
  );
  const { data: product } = useSWR<IProduct>(
    getKeyDetailProduct(1),
    getDetailProduct,
  );

  return (
    <div className="py-20">
      <h1>Email:{currentUser.email}</h1>
      <h2>Product:{JSON.stringify(product)} </h2>
      <h3 className="text-center text-2xl text-primary-500">
        You've clicked the button {count} times.
      </h3>
      <div className="flex w-full justify-center">
        <button
          className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="button"
          onClick={increase}
        >
          Increase
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="button"
          onClick={decrease}
        >
          Decrease
        </button>
      </div>
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const currentUser = await authentication();
  const rootStore = initStoreForGSSP({ currentUser });

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      initialZustandState: JSON.parse(JSON.stringify(rootStore.getState())),
    },
  };
};

export default HomePage;
