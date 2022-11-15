import { useState } from 'react';
import classNames from 'classnames';
import {
  GoogleMap,
  Marker,
  OverlayViewF,
} from '@react-google-maps/api';
import { formatSanityDate } from '../helpers/dates';

const defaultZoom = 13;

const options = {
  clickableIcons: false,
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
  gestureHandling: 'greedy',
};

const MapWithOverlay = ({
  map,
  restaurants,
  onLoad,
  onUnmount,
  center,
  userPosition,
}) => {
  const [openRestaurant, setOpenRestaurant] = useState();

  const onMarkerClick = ((e, restaurant) => {
    console.log('Marker click', e);
    console.log('Restaurant', restaurant);
    setOpenRestaurant(restaurants.find((r) => r._id === restaurant._id));
    map.panTo(restaurant.googleData.location);
  });

  return (
    <div className="h-screen">
      <GoogleMap
        center={center}
        zoom={defaultZoom}
        options={options}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerClassName={classNames({
          'w-full h-screen': true,
          // 'h-screen': !openRestaurant,
          // 'h-2/3': openRestaurant,
        })}
      >
        {/* Restaurant markers */}
        {restaurants.length > 0 && restaurants.map((restaurant) => (
          <Marker
            key={restaurant._id}
            position={restaurant.googleData.location}
            label={restaurant.name}
            onClick={(e) => onMarkerClick(e, restaurant)}
          />
        ))}
        {/* Current position marker */}
        {userPosition && (
          <>
            {/* <Marker
                  position={userPosition}
                  icon="https://developers.google.com/static/maps/documentation/javascript/images/custom-marker.png"
                // icon={me}
                >
                  I am here!!
                </Marker> */}
            <OverlayViewF
              position={userPosition}
              mapPaneName="overlayMouseTarget"
            >
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="w-3 h-3 rounded-full bg-violet-500 ring-4 ring-violet-500/50 cursor-pointer"
                onClick={() => {
                  setOpenRestaurant({
                    id: 'me',
                    name: 'Me',
                    position: userPosition,
                  });
                  map.panTo(userPosition);
                }}
              />
            </OverlayViewF>
          </>
        )}
      </GoogleMap>
      {/* Open restaurant info */}
      {openRestaurant && (
        <div className="h-1/3 absolute bottom-0 right-0 w-full bg-white border-t border-slate-200 p-4">
          <h3>{openRestaurant.name}</h3>
          <br />
          {openRestaurant.article && (
            <>
              <p>{openRestaurant.article.title} - <a href={openRestaurant.article.url} rel="noopener noreferrer" target="_blank" className="underline">Link</a></p>
              <p className="my-2 max-w-prose">
                {openRestaurant.article.description}
              </p>
              <small>
                {formatSanityDate(openRestaurant.article?.issueDate)} Issue
                {' '}- by {openRestaurant.article.contributor}
              </small>
              <br />

            </>
          )}
          {openRestaurant.googleData && (
            <small>
              <a href={openRestaurant.googleData.url} rel="noopener noreferrer" target="_blank" className="underline pr-3">
                Google Maps
              </a>
              {openRestaurant.googleData.website && (
                <a href={openRestaurant.googleData.website} rel="noopener noreferrer" target="_blank" className="underline pr-3">
                  Website
                </a>
              )}
              {openRestaurant.googleData.rating && (
                <span>
                  Google rating: {openRestaurant.googleData.rating} &#9734;
                </span>
              )}
            </small>
          )}
          <button type="button" className="absolute right-4 top-4 underline" onClick={() => setOpenRestaurant()}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MapWithOverlay;
