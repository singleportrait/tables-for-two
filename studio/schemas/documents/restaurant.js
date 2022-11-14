import React from 'react';
import {format, parse} from 'date-fns';

export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'article',
      title: 'Article',
      type: 'article',
    },
    {
      name: 'googleData',
      title: 'Google Info',
      type: 'googleData',
    },
  ],
  orderings: [
    {
      title: 'Pub date, new to old',
      name: 'publicationDateDesc',
      by: [{field: 'article.publicationDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'article.title',
      date: 'article.publicationDate',
      location: 'googleData.location',
    },
    prepare(selection) {
      const {title, subtitle, date, location} = selection;
      const formattedDate = date ? format(new Date(parse(date, 'yyyy-MM-dd', new Date())), 'MM/dd') : undefined;
      const locationStatus = location ? <span>{date && <br />}📌</span> : '';
      return {
        title,
        // subtitle: `${formattedDate || ''}${(formattedDate && subtitle) ? ': ' : ''}${subtitle || ''}`,
        subtitle,
        media: <small style={{textAlign: 'center'}}>{formattedDate}{locationStatus}</small>,
      };
    },
  },
};
