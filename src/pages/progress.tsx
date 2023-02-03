import { getDocument, documentProps } from '@/utils/document';
import styles from '@/styles/layout.module.css';

export default function Progress({ document }: documentProps) {
  return (
    <>
      <section className={styles.halfheight}>
        <h1>Progress</h1>

        <p>
          In order to keep track on what already happened, you can find all
          information about the development progress of fungiverse on this page.
          This includes all past videos and resources that we used in order to
          create fungiverse.
        </p>
      </section>

      <div dangerouslySetInnerHTML={{ __html: document.contentHtml }} />
    </>
  );
}

export async function getStaticProps() {
  const document = await getDocument(`progress`);

  return {
    props: {
      document,
    },
  };
}
