import convert from 'xml-js';

import { formatRSSDate, formatNewYorkerDate } from './dates';

const newYorkerFeed = 'https://www.newyorker.com/feed/magazine/rss';

const fetchNewYorkerArticles = async () => {
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
  const formattedItems = tablesForTwoItems.map((article) => {
    const formattedPubDate = formatRSSDate(article.pubDate._text);
    const formattedIssueDate = formatNewYorkerDate(issueDate);

    return {
      title: article.title._text,
      description: article.description._text,
      publicationDate: formattedPubDate,
      ...(issueDate && {
        issueDate: formattedIssueDate,
      }),
      url: article.link._text,
      contributor: article['dc:creator']._text,
    };
  });
  return formattedItems;
};

export default fetchNewYorkerArticles;
