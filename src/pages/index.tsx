import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/layouts/MainLayout';
import { useCountStore } from '@/store/count/store';

const HomePage = () => {
  const { count, increase, decrease } = useCountStore();
  return (
    <div className="py-20">
      <h1 className="text-primary-500 text-2xl text-center">
        You've clicked the button {count} times.
      </h1>
      <div className="flex justify-center w-full">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
          type="button"
          onClick={increase}
        >
          Increase
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
