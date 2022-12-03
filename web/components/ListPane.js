import classNames from 'classnames';

import { formatSanityDate } from '../helpers/dates';

import Button from './Button';

const ListPane = ({ restaurants, openRestaurant, onClose }) => (
  <div className="absolute bottom-0 right-0 top-0 w-full sm:max-w-sm">
    <Button onClick={onClose} className="absolute right-4 top-20">
      Close
    </Button>
    <div
      style={{ height: 'calc(100vh - 7rem)' }}
      className="relative mt-28 bg-background bg-opacity-90 border-t sm:border-l border-secondary p-4 w-full overflow-y-scroll"
    >
      {restaurants.map((restaurant, i) => (
        <button
          type="button"
          key={restaurant._id}
          onClick={() => openRestaurant(restaurant)}
          className={classNames({
            'flex items-center space-x-4 justify-between cursor-pointer w-full text-left group': true,
            'pt-3': i > 0,
            'border-b border-secondary pb-3': i !== restaurants.length - 1,
          })}
        >
          <div>
            <h2 className="antialiased group-hover:text-primary leading-tight">
              {restaurant.name}
            </h2>
            <small className="text-xs font-mono text-slate-800">
              {formatSanityDate(restaurant.article?.issueDate)} Issue
            </small>
          </div>
          <Button>
            Open
          </Button>
        </button>
      ))}
    </div>
  </div>
);

export default ListPane;
