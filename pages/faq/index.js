import FAQScreen from '../../src/components/screens/FAQScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

// eslint-disable-next-line react/prop-types
// export default function FAQPage({ faqCategories }) {
//   return (
//     <FAQScreen faqCategories={faqCategories} />
//   );
// }

export default websitePageHOC(FAQScreen, {
  pageWrapperProps: {
    seoProps: { headTitle: 'Perguntas Frequentes' },
    pageBoxProps: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
    },
  },
});

export async function getStaticProps() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then((respostaDoServer) => respostaDoServer.json())
    .then((respostaConvertida) => respostaConvertida.data)
    .then((resposta) => resposta);
  return {
    props: {
      faqCategories,
    },
  };
}
