import { getWriteClient } from '../../sanity/server';

import uploadArticle from '../../helpers/uploadArticle';

export default async function createRestaurants(req, res) {
  const { article } = JSON.parse(req.body);
  // console.log('Sanity article', article);
  if (!article) return;

  await uploadArticle({ res, getWriteClient, article });
}
