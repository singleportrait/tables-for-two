import { useState } from 'react';
import { parse, format } from 'date-fns';

import items from '../data/page1_oct232022';

const newYorkerUrl = 'https://www.newyorker.com/';

const CreateRestaurants = () => {
  const [articles, setArticles] = useState([]);
  const [serverMessage, setServerMessage] = useState('');

  const formatRestaurants = (e) => {
    e.preventDefault();
    const simplerArticles = items.map((article) => ({
      contributor: article.contributors[0].name,
      title: article.hed,
      subtitle: article.dek,
      pubDate: article.pubDate,
      // date: parse(article.pubDate, 'MMMM d, yyyy', new Date()) || article.pubDate,
      url: `${newYorkerUrl}${article.url}`,
    }));
    console.log('Simpler articles', simplerArticles);
    setArticles(simplerArticles);
  };

  const saveFirstRestaurant = async (e) => {
    e.preventDefault();
    setServerMessage('');
    if (articles.length === 0) return;
    const article = articles[0];

    try {
      await fetch('/api/create-restaurants', {
        method: 'POST',
        body: JSON.stringify({ article }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response data', data);
          setServerMessage(data.message);
        });
    } catch (err) {
      console.log('There was an error', err);
    }
  };

  return (
    <div>
      <button type="button" onClick={(e) => formatRestaurants(e)} className="bg-gray-200 py-1 px-2 rounded-full">Format restaurants</button>
      {articles.length > 0 && (
        <button type="button" onClick={(e) => saveFirstRestaurant(e)} className="bg-gray-200 py-1 px-2 rounded-full">Save first restaurant</button>
      )}
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
          <small>{format(new Date(parse(article.pubDate, 'MMMM d, yyyy', new Date())), 'LLL dd, yyyy')}</small>
          <p>{article.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default CreateRestaurants;
