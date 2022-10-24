import { useState } from 'react';
import convert from 'xml-js';
import { format } from 'date-fns';

const newYorkerFeed = 'https://www.newyorker.com/feed/magazine/rss';

const RSSFetch = () => {
  const [articles, setArticles] = useState([]);
  const fetchFeed = async (e) => {
    e.preventDefault();
    setArticles([]);
    const xml = await fetch(newYorkerFeed)
      .then((response) => response.text());
    // console.log('Feed data', xml);
    const json = convert.xml2js(xml, { compact: true, spaces: 2, trim: true });
    // console.log('Feed JSON', json);
    const items = json.rss.channel.item;
    // console.log('Items', items);
    const tablesForTwoItems = items.filter((item) => item.category._text === 'Magazine / Tables for Two'
        || (Array.isArray(item.category) && item.category.includes('Magazine / Tables for Two')));
    // console.log('Tables for Two items', tablesForTwoItems);
    setArticles(tablesForTwoItems);
  };
  return (
    <div>
      <button type="button" onClick={(e) => fetchFeed(e)} className="bg-gray-200 py-1 px-2 rounded-full">Fetch XML feed</button>
      <hr className="mt-2" />
      {articles.length > 0 && articles.map((article) => (
        <div className="mt-4" key={article.title._text}>
          <h3>
            <a href={article.link._text} className="text-black underline" target="_blank" rel="noreferrer">
              {article.title._text}
            </a>
          </h3>
          <h4>{article['dc:creator']._text}</h4>
          <small>{format(new Date(article.pubDate._text), 'LLL dd, yyyy')}</small>
          <p>{article.description._text}</p>
        </div>
      ))}
    </div>
  );
};

export default RSSFetch;
