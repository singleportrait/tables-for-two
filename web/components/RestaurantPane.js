import { formatSanityDate } from '../helpers/dates';
import ButtonLink from './ButtonLink';
import Button from './Button';

const RestaurantPane = ({ restaurant, onClick }) => (
  <div className="absolute bottom-0 right-0 w-full bg-background border-t border-secondary p-4">
    <h2 className="font-bold text-3xl mb-2 mr-16">
      {restaurant.name}
    </h2>
    <Button onClick={onClick} className="absolute right-4 top-4">
      Close
    </Button>
    {restaurant.article && (
      <div className="border border-secondary py-2 px-4 bg-white">
        <a href={restaurant.article.url} rel="noopener noreferrer" target="_blank">
          <h4 className="font-mono text-lg underline underline-offset-4 decoration-secondary">
            {restaurant.article.title}
          </h4>
        </a>
        <p className="mt-2 mb-1 max-w-prose text-sm text-slate-800 antialiased">
          {restaurant.article.description}
        </p>
        <small className="text-xs font-mono text-slate-800">
          {formatSanityDate(restaurant.article?.issueDate)} Issue
          {' '}- by {restaurant.article.contributor}
        </small>
      </div>
    )}
    {restaurant.googleData && (
      <div className="flex space-x-3 mt-3 items-center">
        <ButtonLink href={restaurant.googleData.url}>
          Google Maps
        </ButtonLink>
        {restaurant.googleData.website && (
          <ButtonLink href={restaurant.googleData.website}>
            Website
          </ButtonLink>
        )}
        {restaurant.googleData.rating && (
          <small>
            Google rating: {restaurant.googleData.rating} &#9734;
          </small>
        )}
      </div>
    )}
  </div>
);

export default RestaurantPane;
