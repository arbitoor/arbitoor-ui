import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Searchbar from '../components/Searchbar/Searchbar';
import Swap from '../components/Swap/Swap';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Arbitoor</title>
        <meta
          name="Arbitoor"
          content="The best swap aggregator on Near Protocol."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Searchbar />
      <Swap />
    </Layout>
  );
};

export default Home;
