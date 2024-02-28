import Page from '_pages/cart';
import { NextPage } from 'next';
import Head from 'next/head';

const Cart: NextPage = () => (
  <>
    <Head>
      <title>My cart</title>
    </Head>
    <Page />
  </>
);

export default Cart;
