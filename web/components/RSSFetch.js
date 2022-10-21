import React from 'react';

const newYorkerFeed = 'https://www.newyorker.com/feed/magazine/rss';

const RSSFetch = () => {
  const fetchFeed = async () => {
    const feed = await fetch(newYorkerFeed)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then((data) => data);
    console.log('Feed data', feed);
  };
  return (
    <div>
      <button type="button" onClick={() => fetchFeed()}>Fetch feed</button>
    </div>
  );
};

export default RSSFetch;
