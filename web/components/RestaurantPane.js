import Image from 'next/image';

import { formatSanityDate } from '../helpers/dates';
import newYorkerLogo from '../public/images/new_yorker_logo.svg';

import ButtonLink from './ButtonLink';
import Button from './Button';

const RestaurantPane = ({ restaurant, onClose }) => (
  <div className="absolute bottom-0 right-0 sm:max-w-sm w-full bg-background bg-opacity-90 border-t sm:border-l border-secondary p-4">
    <Button onClick={onClose} className="absolute right-4 -top-10">
      Close
    </Button>
    <div className="flex flex-col justify-center items-center">
      <h2 className="border border-primary py-1 px-4 bg-white w-full text-center text-2xl antialiased">
        {restaurant.name}
      </h2>
      <div className="h-4 w-0 border-l border-l-secondary" />
    </div>
    {restaurant.article && (
      <div className="border border-secondary py-2 px-4 bg-white">
        <div className="flex items-center">
          <Image
            src={newYorkerLogo}
            alt="New Yorker Logo"
            className="w-24 mt-3 mb-2"
          />
          <span>
            :
          </span>
        </div>
        <a href={restaurant.article.url} rel="noopener noreferrer" target="_blank">
          <h4 className="font-mono text-base underline underline-offset-2 decoration-secondary">
            {restaurant.article.title}
          </h4>
        </a>
        <p className="mt-2 mb-1 max-w-prose text-sm text-slate-800 antialiased">
          {restaurant.article.description}
        </p>
        <small className="text-xs font-mono text-slate-800">
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
          <small className="font-mono text-center -mt-1">
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
