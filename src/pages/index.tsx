import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import { Canvas } from '@react-three/fiber';
import Logo from '@/components/logo/logo';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>fungiverse</title>
        <meta name="description" content="fungiverse" />
      </Head>

      <main className={styles.main}>
        <div className={styles.ndOutput}>
          <Canvas
            camera={{
              fov: 65,
              near: 0.1,
              far: 200,
              position: [0, 0, 10],
            }}
          >
            <Logo />
          </Canvas>
        </div>

        <h2 className={styles.title}>
          The humans are dead! Long live the fungi!
        </h2>

        <p className={styles.description}>
          The humans destroyed earth, everything is dead... or is it? The fungi
          take over and you can create your own world or explore the worlds of
          others.
        </p>

        <p className={styles.description}>
          The goal is to provide tools that can be used to create an infinite
          number of generative fungi-worlds to build a metaverse on {` `}
          <a href="https://tezos.com/">Tezos</a>. You can follow the open
          process in various formats:
        </p>

        <div className={styles.grid}>
          <a href="https://github.com/fungiverse/site" className={styles.card}>
            <h2>GitHub &rarr;</h2>
            <p>Code is open source via AGPL</p>
          </a>

          <a href="https://twitch.tv/NERDDISCO" className={styles.card}>
            <h2>Twitch &rarr;</h2>
            <p>Watch NERDDISCO creating fungiverse!</p>
          </a>

          <a href="https://mastodon.social/@NERDDISCO" className={styles.card}>
            <h2>Mastodon &rarr;</h2>
            <p>Follow NERDDISCO to get all updates.</p>
          </a>

          <a href="https://www.youtube.com/@NERDDISCO" className={styles.card}>
            <h2>YouTube &rarr;</h2>
            <p>Past fungiverse streams from NERDDISCO</p>
          </a>
        </div>
      </main>
    </div>
  );
}
