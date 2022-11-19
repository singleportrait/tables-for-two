import { formatSanityDate } from '../helpers/dates';

const RestaurantPane = ({ restaurant, onClick }) => (
  <div className="h-1/3 absolute bottom-0 right-0 w-full bg-white border-t border-slate-200 p-4">
    <h3>{restaurant.name}</h3>
    <br />
    {restaurant.article && (
    <>
      <p>{restaurant.article.title} - <a href={restaurant.article.url} rel="noopener noreferrer" target="_blank" className="underline">Link</a></p>
      <p className="my-2 max-w-prose">
        {restaurant.article.description}
      </p>
      <small>
        {formatSanityDate(restaurant.article?.issueDate)} Issue
        {' '}- by {restaurant.article.contributor}
      </small>
      <br />

    </>
    )}
    {restaurant.googleData && (
    <small>
      <a href={restaurant.googleData.url} rel="noopener noreferrer" target="_blank" className="underline pr-3">
        Google Maps
      </a>
      {restaurant.googleData.website && (
      <a href={restaurant.googleData.website} rel="noopener noreferrer" target="_blank" className="underline pr-3">
        Website
      </a>
      )}
      {restaurant.googleData.rating && (
      <span>
        Google rating: {restaurant.googleData.rating} &#9734;
      </span>
      )}
    </small>
    )}
    <button type="button" className="absolute right-4 top-4 underline" onClick={onClick}>Close</button>
  </div>
);

export default RestaurantPane;
