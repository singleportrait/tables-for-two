import { isBefore, parse } from 'date-fns';

import { getClient } from '../sanity/server';
import { indexQuery } from '../sanity/queries';
import { usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';
import MapContainer from '../components/MapContainer';

const Index = ({ indexData, preview }) => {
  const { data } = usePreviewSubscription(indexQuery, {
    initialData: indexData,
    enabled: preview,
  });

  if (!indexData) {
    return (
      <Layout>
        <h2>Could not fetch homepage information</h2>
      </Layout>
    );
  }

  // console.log('Index page data', data);

  const {
    name,
    subtitle,
    infoDescription,
    github,
    seoDescription,
    seoImage,
    restaurants,
  } = data;

  const sortedRestaurants = restaurants?.sort((a, b) => {
    const pubDateA = parse(a.article.publicationDate, 'yyyy-MM-dd', new Date());
    const pubDateB = parse(b.article.publicationDate, 'yyyy-MM-dd', new Date());
    return isBefore(pubDateA, pubDateB) ? 1 : -1;
  });

  return (
    <Layout
      preview={preview}
      slug=""
      description={seoDescription}
      image={seoImage}
    >
      <MapContainer
        name={name}
        subtitle={subtitle}
        infoDescription={infoDescription}
        github={github}
        restaurants={sortedRestaurants}
      />
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const indexData = await getClient(preview).fetch(indexQuery);
  return {
    props: {
      indexData,
      preview,
    },
  };
}

export default Index;
