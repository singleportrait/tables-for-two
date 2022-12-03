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
    const json = convert.xml2js(xml, { compact: true, spaces: 2, trim: true });
    // console.log('Feed JSON', json);

    // Get issue date from feed title
    const feedTitle = json.rss.channel.title._text;
    const regex = '(The New Yorker )(.*)';
    const found = feedTitle.match(regex);
    const issueDate = found?.[2] || undefined;

    // Format all matching articles
    const items = json.rss.channel.item;
    // console.log('Items', items);
    const tablesForTwoItems = items.filter((item) => item.category._text === 'Magazine / Tables for Two'
      || (Array.isArray(item.category) && item.category.includes('Magazine / Tables for Two')));
    // console.log('Tables for Two items', tablesForTwoItems);
    const formattedItems = tablesForTwoItems.map((article) => ({
      title: article.title._text,
      description: article.description._text,
      publicationDate: article.pubDate._text,
      ...(issueDate && {
        issueDate,
      }),
      url: article.link._text,
      contributor: article['dc:creator']._text,
    }));
    setArticles(formattedItems);
  };

  const [serverMessage, setServerMessage] = useState('');
  const saveRestaurant = async (e, article) => {
    e.preventDefault();
    setServerMessage('Saving...');
    if (!article) return;

    try {
      await fetch('/api/create-restaurant', {
        method: 'POST',
        body: JSON.stringify({ article }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('Response data', data);
          setServerMessage(data.message);
        });
    } catch (err) {
      console.log('There was an error', err);
      setServerMessage('There was an error saving that');
    }
  };
  return (
    <div>
      <button type="button" onClick={(e) => fetchFeed(e)} className="bg-gray-200 py-1 px-2 rounded-full">Fetch XML feed</button>
      <hr className="mt-2" />
      {serverMessage && (
        <div className="my-2 bg-gray-300 p-2">
          {serverMessage}
        </div>
      )}
      {articles.length > 0 && articles.map((article) => (
        <div className="mt-4" key={article.title}>
          <h3>
            <a href={article.url} className="text-black underline" target="_blank" rel="noreferrer">
              {article.title}
            </a>
          </h3>
          <h4>{article.contributor}</h4>
          <small>Publication date: {format(new Date(article.publicationDate), 'LLL dd, yyyy')}</small>
          <p>{article.description}</p>
          <button type="button" onClick={(e) => saveRestaurant(e, article)} className="bg-gray-200 py-1 px-2 rounded-full">
            Save article & restaurant
          </button>
        </div>
      ))}
    </div>
  );
};

export default RSSFetch;
