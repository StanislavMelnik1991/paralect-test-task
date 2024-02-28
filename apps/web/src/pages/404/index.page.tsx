import Page from '_pages/404';
import { NextPage } from 'next';
import Head from 'next/head';

const NotFound: NextPage = () => (
  <>
    <Head>
      <title>Page not found</title>
    </Head>
    <Page />
  </>
);

export default NotFound;
