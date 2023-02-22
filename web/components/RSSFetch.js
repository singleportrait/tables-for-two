import { useState } from 'react';
import fetchNewYorkerArticles from '../helpers/xmlParse';

const RSSFetch = () => {
  const [articles, setArticles] = useState([]);
  const fetchFeed = async (e) => {
    e.preventDefault();
    setArticles([]);
    const formattedItems = await fetchNewYorkerArticles();
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
          <small>Publication date: {article.publicationDate}</small>
          <br />
          <small>Issue date: {article.issueDate}</small>
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
