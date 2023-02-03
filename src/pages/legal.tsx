import { getDocument, documentProps } from '@/utils/document';

export default function Legal({ document }: documentProps) {
  return (
    <>
      <h1>Legal</h1>

      <div dangerouslySetInnerHTML={{ __html: document.contentHtml }} />
    </>
  );
}

export async function getStaticProps() {
  const document = await getDocument(`legal`);

  return {
    props: {
      document,
    },
  };
}
