import { format, parse } from 'date-fns';

import { getClient } from '../../sanity/server';

export default async function createRestaurants(req, res) {
  console.log('body', JSON.parse(req.body));
  const { article } = JSON.parse(req.body);
  console.log('Sanity article', article);
  // console.log('Formatted date', format(article.date, 'yyyy-MM-dd'));
  const formattedDate = format(parse(article.pubDate, 'MMMM d, yyyy', new Date()), 'yyyy-MM-dd') || article.pubDate;

  const sanityArticle = {
    _type: 'restaurant',
    name: 'New restaurant ✨',
    articleTitle: article.title,
    articleDescription: article.subtitle,
    publicationDate: formattedDate,
    articleUrl: article.url,
    contributor: article.contributor,
  };

  console.log('Sanity-formatted article', sanityArticle);

  const query = '*[_type == "restaurant" && articleTitle == $articleTitle] {name, articleTitle}';
  const params = { articleTitle: sanityArticle.articleTitle };
  console.log('Params', params);

  let message = 'Restaurant submitted';

  try {
    const restaurants = await getClient().fetch(query, params)
      .then((restos) => restos);

    console.log('We received something', restaurants);
    if (restaurants.length === 0) {
      console.log('No restaurants found, let us create one');

      const response = await getClient().create(sanityArticle).then((resp) => resp);
      console.log('Restaurant was created', response);
      message = 'Restaurant created!';
    } else {
      console.log('We found a restaurant, we will not make a new one');
      message = 'Found existing restaurant';
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Couldn\'t create restaurant', err });
  }
  return res.status(200).json({ message });
}
