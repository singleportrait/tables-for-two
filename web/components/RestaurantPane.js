import { formatSanityDate } from '../helpers/dates';

import ButtonLink from './ButtonLink';
import Button from './Button';
import LinkIcon from './LinkIcon';

const RestaurantPane = ({ restaurant, onClose }) => (
  <div className="absolute bottom-0 right-0 sm:max-w-sm w-full bg-primary bg-opacity-90 p-4">
    <Button onClick={onClose} className="absolute right-4 -top-10">
      Close
    </Button>
    <h2 className="pb-3 text-3xl leading-none antialiased text-white">
      {restaurant.name}
    </h2>
    {restaurant.article && (
      <div className="py-2 px-3 bg-white">
        <a href={restaurant.article.url} rel="noopener noreferrer" target="_blank" className="group">
          <h4 className="font-serif text-lg underline underline-offset-4 decoration-secondary group-hover:decoration-primary">
            <span className="antialiased">{restaurant.article.title}</span>
            <LinkIcon className="w-4 h-4 text-secondary inline ml-1 -mt-0.5 group-hover:text-primary" />
          </h4>
        </a>
        <p className="mt-2 mb-2 max-w-prose font-mono text-sm text-stone-900 antialiased">
          {restaurant.article.description}
        </p>
        <small className="text-xs font-mono text-stone-900">
          {formatSanityDate(restaurant.article?.issueDate)} Issue
          {' '}• by {restaurant.article.contributor}
        </small>
      </div>
    )}
    {restaurant.googleData && (
      <div className="flex space-x-4 mt-3 -mb-1 justify-between items-center">
        <div className="flex space-x-4 items-center">
          <ButtonLink href={restaurant.googleData.url}>
            Google Maps
          </ButtonLink>
          {restaurant.googleData.website && (
            <ButtonLink href={restaurant.googleData.website}>
              Website
            </ButtonLink>
          )}
        </div>
        {restaurant.googleData.rating && (
          <small className="font-mono text-center -mt-1 text-white">
            {restaurant.googleData.rating}
            {' '}
            <span className="text-xl leading-none">
              &#9734;
            </span>
            <div className="text-2xs">
              on google
            </div>
          </small>
        )}
      </div>
    )}
  </div>
);

export default RestaurantPane;
