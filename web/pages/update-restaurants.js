import { getClient } from '../sanity/server';
import { updatePageQuery } from '../sanity/queries';
import { usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';
import UpdateRestaurants from '../components/UpdateRestaurants';


const UpdateRestaurantsPage = ({ indexData, preview }) => {
  const { data } = usePreviewSubscription(updatePageQuery, {
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
    restaurants,
  } = data;

  const disclaimer = `Disclaimer: This page is incomplete, since the initial push for it was to add price ratings to every restaurant, and it turns out they are not sending that data now. Currently it only fetches the latest place details, but doesn't then save the response(s) to the database. We will still want to finish this and run it every ~3 months to get fresh website, rating, and operational status, especially, but it can be completed later! Note: running this for all the restaurants (${restaurants.length}) *does cost money*, so we should be careful about how often we run it.`;

  return (
    <Layout
      preview={preview}
      slug=""
      description={seoDescription}
      image={seoImage}
    >
      <div className="p-4">
        <h3>{name}</h3>
        <h2>Update Restaurants&apos; Google Data</h2>
        <p className="p-3 bg-gray-200">{disclaimer}</p>
        <div className="grid grid-cols-2 gap-x-4">
          <UpdateRestaurants restaurants={restaurants} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const indexData = await getClient(preview).fetch(updatePageQuery);

  return {
    props: {
      indexData,
      preview,
    },
  };
}

export default UpdateRestaurantsPage;
