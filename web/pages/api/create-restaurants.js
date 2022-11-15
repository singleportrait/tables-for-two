import { getWriteClient } from '../../sanity/server';

import { formatNewYorkerDate } from '../../helpers/dates';

export default async function createRestaurants(req, res) {
  const { articles } = JSON.parse(req.body);
  // console.log('Sanity articles', articles);
  if (articles.length === 0) return;

  const formattedArticles = articles.map((article) => {
    const formattedPubDate = formatNewYorkerDate(article.pubDate);
    const formattedIssueDate = formatNewYorkerDate(article.issueDate);
    return {
      _type: 'restaurant',
      name: 'New restaurant ✨',
      article: {
        title: article.title,
        description: article.subtitle,
        publicationDate: formattedPubDate,
        issueDate: formattedIssueDate,
        url: article.url,
        contributor: article.contributor,
      },
    };
  });

  console.log('Articles:', formattedArticles.map((a) => a.article.title));

  let message = 'Restaurant submitted';
  const successfulUploads = [];
  const failedUploads = [];

  try {
    await Promise.all(formattedArticles.map(async (article, i) => {
      const query = '*[_type == "restaurant" && article.title == $articleTitle] {name, "article": article.title}';
      const params = { articleTitle: article.article.title };

      const restaurants = await getWriteClient().fetch(query, params)
        .then((restos) => restos);

      console.log(`Query response ${i}:`, restaurants);
      if (restaurants.length === 0) {
        console.log(`No restaurants found for query ${i}, let us create one`);

        const response = await getWriteClient().create(article).then((resp) => resp);
        console.log(`Restaurant ${i} was created:`, response);
        successfulUploads.push(article.article.title);
        return;
      }
      console.log(`We found a restaurant for query ${i}, we will not make a new one`);
      failedUploads.push(article.article.title);
    }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Couldn\'t create restaurant(s)', err });
  } finally {
    if (successfulUploads.length > 1) message = 'Restaurants created!';
    res.status(200).json({ message, successfulUploads, failedUploads });
  }
}
