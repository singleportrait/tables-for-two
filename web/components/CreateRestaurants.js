import { useState } from 'react';

import items from '../data/sample';

const newYorkerUrl = 'https://www.newyorker.com';

// console.log('All article items', items);

const articles = items.map((article) => ({
  contributor: article.contributors[0].name,
  title: article.hed,
  description: article.dek,
  pubDate: article.pubDate,
  issueDate: article.issueDate,
  // date: parse(article.pubDate, 'MMMM d, yyyy', new Date()) || article.pubDate,
  url: `${newYorkerUrl}${article.url}`,
}));

const CreateRestaurants = () => {
  const [serverMessage, setServerMessage] = useState('');

  const saveRestaurants = async (e) => {
    e.preventDefault();
    setServerMessage('Saving...');
    if (articles.length === 0) return;

    // const someArticles = articles.slice(0, 2);

    try {
      await fetch('/api/create-restaurants', {
        method: 'POST',
        body: JSON.stringify({ articles }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('Response data', data);
          setServerMessage(
            <div>
              {data.message}
              <br />
              {data.successfulUploads.length} successful uploads:
              <ul className="list-disc ml-4">{data.successfulUploads.map((r) => <li key={r}>{r}</li>)}</ul>
              <br />
              {data.failedUploads.length} failed uploads:
              <ul className="list-disc ml-4">{data.failedUploads.map((r) => <li key={r}>{r}</li>)}</ul>
              <br />
            </div>,
          );
        });
    } catch (err) {
      console.log('There was an error', err);
      setServerMessage('There was an error saving that');
    }
  };

  return (
    <div>
      {articles.length > 0 && (
        <button type="button" onClick={(e) => saveRestaurants(e)} className="bg-gray-200 py-1 px-2 rounded-full">Save restaurants</button>
      )}
      <hr className="mt-2" />
      {serverMessage && (
        <div className="my-2 bg-gray-300 p-2">
          {serverMessage}
        </div>
      )}
      {articles.length > 0 && articles.map((article, i) => (
        <div className="mt-4" key={article.title}>
          <h3>
            {i}:{' '}
            <a href={article.url} className="text-black underline" target="_blank" rel="noreferrer">
              {article.title}
            </a>
          </h3>
          <h4>{article.contributor}</h4>
          <small>Publication date: {article.pubDate}</small>
          <br />
          <small>Issue date: {article.issueDate}</small>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CreateRestaurants;
