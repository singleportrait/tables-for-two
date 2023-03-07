import { getClient } from '../sanity/server';
import { uploadPageQuery } from '../sanity/queries';
import { usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';
import RSSFetch from '../components/RSSFetch';
import CreateRestaurants from '../components/CreateRestaurants';

const Restaurants = ({ indexData, preview }) => {
  const { data } = usePreviewSubscription(uploadPageQuery, {
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

  const {
    name,
    seoDescription,
    seoImage,
  } = data;

  return (
    <Layout
      preview={preview}
      slug=""
      description={seoDescription}
      image={seoImage}
    >
      <div className="p-4">
        <h2>Restaurants</h2>
        <h2>{name}</h2>
        <div className="grid grid-cols-2 gap-x-4">
          <RSSFetch />
          <CreateRestaurants />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const indexData = await getClient(preview).fetch(uploadPageQuery);

  return {
    props: {
      indexData,
      preview,
    },
  };
}

export default Restaurants;
