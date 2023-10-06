import { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

import MainLayout from '@/layouts/MainLayout';

const ContactPage = () => {
  return <h1 className="text-primary-500">Service</h1>;
};

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default ContactPage;
