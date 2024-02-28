import Page from '_pages/expire-token';
import { NextPage } from 'next';
import Head from 'next/head';

const Expire: NextPage = () => (
  <>
    <Head>
      <title>Password reset link expired</title>
    </Head>
    <Page />
  </>
);

export default Expire;
