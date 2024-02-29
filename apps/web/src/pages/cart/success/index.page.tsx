import Page from '_pages/cart';
import { NextPage } from 'next';
import Head from 'next/head';

const Cart: NextPage = () => (
  <>
    <Head>
      <title>Payment Successful</title>
    </Head>
    <Page />
  </>
);

export default Cart;
