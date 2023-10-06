import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/layouts/MainLayout';
import { useCountStore } from '@/store/count/store';

const HomePage = () => {
  const { count, increase, decrease } = useCountStore();
  return (
    <div className="py-20">
      <h1 className="text-center text-2xl text-primary-500">
        You've clicked the button {count} times.
      </h1>
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
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default HomePage;
