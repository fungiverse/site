import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './footer';
import styles from '@/styles/layout.module.css';

interface LayoutProps {
  children: ReactNode[] | ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>fungiverse</title>
      </Head>

      <main className={styles.main}>{children}</main>

      <Footer />
    </>
  );
}
