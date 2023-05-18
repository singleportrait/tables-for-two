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
    {
      title: 'Restaurant name, A to Z',
      name: 'restaurantNameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'article.title',
      date: 'article.issueDate',
      location: 'googleData.location',
      status: 'googleData.status',
    },
    prepare(selection) {
      const {title, subtitle, date, location, status} = selection;
      const formattedDate = date ? format(new Date(parse(date, 'yyyy-MM-dd', new Date())), 'M/d') : undefined;
      const formattedYear = date ? format(new Date(parse(date, 'yyyy-MM-dd', new Date())), 'yy') : undefined;
      const yearHtml = formattedYear && <small style={{fontSize: '.6rem', color: '#333'}}>'{formattedYear}</small>;
      const locationStatus = location ? <>📌</> : '';
      const restaurantStatus = (status !== 'OPERATIONAL' && status !== undefined) ? <>️🚨️</> : '';
      return {
        title,
        // subtitle: `${formattedDate || ''}${(formattedDate && subtitle) ? ': ' : ''}${subtitle || ''}`,
        subtitle,
        media: <small style={{textAlign: 'center', fontSize: '.75rem'}}>{formattedDate}<span>{formattedDate && <br />}{yearHtml}{locationStatus}{restaurantStatus}</span></small>,
      };
    },
  },
};
