import Page from '_pages/home';
import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Shopy</title>
    </Head>
    <Page />
  </>
);

export default Home;
