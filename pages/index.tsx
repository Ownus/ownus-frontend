import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import Layout from '@components/layout/layout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <main>hi</main>
    </Layout>
  );
}
