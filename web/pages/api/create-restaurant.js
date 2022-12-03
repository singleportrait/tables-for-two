import { getWriteClient } from '../../sanity/server';

import { formatNewYorkerDate, formatRSSDate } from '../../helpers/dates';

export default async function createRestaurants(req, res) {
  const { article } = JSON.parse(req.body);
  // console.log('Sanity article', article);
  if (!article) return;

  // TODO: Format XML date?
  const formattedPubDate = formatRSSDate(article.publicationDate);
  const formattedIssueDate = formatNewYorkerDate(article.issueDate);

  const formattedArticle = {
    _type: 'restaurant',
    name: 'New restaurant ✨',
    article: {
      title: article.title,
      description: article.description,
      publicationDate: formattedPubDate,
      issueDate: formattedIssueDate,
      url: article.url,
      contributor: article.contributor,
    },
  };

  // console.log('Formatted article', formattedArticle);

  let message = 'Restaurant submitted';
  try {
    const query = '*[_type == "restaurant" && article.title == $articleTitle] {name, "article": article.title}';
    const params = { articleTitle: formattedArticle.article.title };

    const restaurants = await getWriteClient().fetch(query, params)
      .then((restos) => restos);

    console.log('Query response:', restaurants);
    if (restaurants.length === 0) {
      console.log('No restaurants found for query, let us create one');

      const response = await getWriteClient().create(formattedArticle).then((resp) => resp);
      message = 'Restaurant was created';
      console.log('Restaurant was created:', response);
    } else {
      console.log('We found a restaurant for query, we will not make a new one');
      message = 'That restaurant already exists';
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Couldn\'t create restaurant(s)', err });
  }
  res.status(200).json({ message });
}
