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
      name: 'articleTitle',
      title: 'Article Title',
      type: 'string',
    },
    {
      name: 'articleDescription',
      title: 'Article Description',
      type: 'text',
    },
    {
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
    },
    {
      name: 'articleUrl',
      title: 'Article Url',
      type: 'url',
    },
    {
      name: 'contributor',
      title: 'Article Contributor',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint',
    },
  ],
  orderings: [
    {
      title: 'Pub date, new to old',
      name: 'publicationDateDesc',
      by: [{field: 'publicationDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'articleTitle',
      date: 'publicationDate',
      location: 'location',
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
