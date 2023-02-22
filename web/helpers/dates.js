import { format, parse } from 'date-fns';

export const formatNewYorkerDate = (date) => {
  try {
    const parsedDate = parse(date, 'MMMM d, yyyy', new Date());
    return format(parsedDate, 'yyyy-MM-dd');
  } catch (err) {
    console.log('Error parsing New Yorker date');
    return undefined;
  }
};

export const formatRSSDate = (date) => {
  try {
    return format(new Date(date), 'yyyy-MM-dd');
  } catch (err) {
    console.log('Error parsing RSS date');
    return undefined;
  }
};

export const formatSanityDate = (date) => {
  try {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    return format(parsedDate, 'MMMM d, yyyy');
  } catch (err) {
    console.log('Error parsing Sanity date');
    return date;
  }
};
