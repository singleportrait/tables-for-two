export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'articleTitle',
      title: 'Article Title',
      type: 'string',
    },
    {
      name: 'articleDescription',
      title: 'Article Description',
      type: 'text',
    },
    {
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
    },
    {
      name: 'articleUrl',
      title: 'Article Url',
      type: 'url',
    },
  ],
};
