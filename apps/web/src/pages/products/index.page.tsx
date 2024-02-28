import Page from '_pages/products';
import { NextPage } from 'next';
import Head from 'next/head';

const Products: NextPage = () => (
  <>
    <Head>
      <title>Your Products</title>
    </Head>
    <Page />
  </>
);

export default Products;
