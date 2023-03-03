import GoogleFieldsetUpdater from '../../components/GoogleFieldsetUpdater';

export default {
  name: 'googleData',
  title: 'Google Info',
  type: 'object',
  fields: [
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint',
      inputComponent: GoogleFieldsetUpdater,
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'website',
      title: 'website',
      type: 'url',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    // {
    //   name: 'priceLevel',
    //   title: 'Price Level',
    //   type: 'number',
    // },
    {
      name: 'status',
      title: 'Business Status',
      type: 'string',
    },
    {
      name: 'id',
      title: 'Place ID',
      type: 'string',
    },
  ],
};
