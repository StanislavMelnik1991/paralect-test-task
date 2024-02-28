import Page from '_pages/profile';
import { NextPage } from 'next';
import Head from 'next/head';

const Profile: NextPage = () => (
  <>
    <Head>
      <title>Profile</title>
    </Head>
    <Page />
  </>
);

export default Profile;
