import uploadArticle from '../../helpers/uploadArticle';
import fetchNewYorkerArticles from '../../helpers/xmlParse';
import { getWriteClient } from '../../sanity/server';

export default async function createRestaurants(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      const articles = await fetchNewYorkerArticles();

      console.log('Article', articles);
      if (!articles) return;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        // res.status(200).json({ success: true });
        await uploadArticle({ res, getWriteClient, article: articles[0] });
      } else {
        // Cancel out here
        res.status(401).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
