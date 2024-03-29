export default {
  name: 'article',
  title: 'Article',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    },
    {
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
    },
    {
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'contributor',
      title: 'Contributor',
      type: 'string',
    },
  ],
};
