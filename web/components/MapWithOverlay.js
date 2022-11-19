import { useState } from 'react';
import classNames from 'classnames';
import { GoogleMap } from '@react-google-maps/api';
import { PortableText } from '@portabletext/react';

import CustomMarker from './CustomMarker';
import RestaurantPane from './RestaurantPane';
import Button from './Button';
import ButtonLink from './ButtonLink';

const defaultZoom = 13;

const options = {
  clickableIcons: false,
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
  gestureHandling: 'greedy',
  minZoom: 11,
  mapId: 'cd12d59691f9cb79',
};

const MapWithOverlay = ({
  map,
  restaurants,
  onLoad,
  onUnmount,
  center,
  userPosition,
  name,
  infoDescription,
  github,
}) => {
  const [openRestaurant, setOpenRestaurant] = useState();
  const [openInfoPane, setOpenInfoPane] = useState(false);

  const onMarkerClick = ((e, restaurant) => {
    console.log('Marker click', e);
    console.log('Restaurant', restaurant);
    setOpenRestaurant(restaurants.find((r) => r._id === restaurant._id));
    // Center it a little *above* true screen center
    // TODO: Ensure screen height and additional zoom levels all look good!
    const mapZoom = map.getZoom();
    let adjustment;

    if (mapZoom === 13) adjustment = 0.017;
    else if (mapZoom === 14) adjustment = 0.01;
    else if (mapZoom === 15) adjustment = 0.004;
    else if (mapZoom === 16) adjustment = 0.0015;
    else if (mapZoom === 17) adjustment = 0.0007;
    else if (mapZoom === 18) adjustment = 0.0004;
    else adjustment = 0;

    map.panTo({
      lat: restaurant.googleData.location.lat - adjustment,
      lng: restaurant.googleData.location.lng,
    });
  });

  return (
    <div className="h-screen relative">
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
          <CustomMarker
            key={restaurant._id}
            id={restaurant._id}
            label={restaurant.name}
            markerStyle="primary"
            position={restaurant.googleData.location}
            onClick={(e) => onMarkerClick(e, restaurant)}
            openRestaurant={openRestaurant}
          />
        ))}
        {/* Current position marker */}
        {userPosition && (
          <>
            {/* <Marker
              position={userPosition}
            // icon="https://developers.google.com/static/maps/documentation/javascript/images/custom-marker.png"
            // icon={me}
            /> */}
            <CustomMarker
              id="me"
              label="You"
              markerStyle="secondary"
              position={userPosition}
              openRestaurant={openRestaurant}
              onClick={() => {
                setOpenRestaurant({
                  _id: 'me',
                  name: 'Me',
                  position: userPosition,
                });
                map.panTo(userPosition);
              }}
            />
          </>
        )}
      </GoogleMap>
      <h1 className="absolute top-2 left-2 text-2xl text-primary-dark antialiased">
        {name || 'Tables for Two'}
      </h1>
      <div className="absolute top-3 right-3 flex space-x-4 items-center">
        {infoDescription && !openInfoPane && !openRestaurant && (
          <Button onClick={() => setOpenInfoPane(true)}>
            i
          </Button>
        )}
      </div>
      {/* Open restaurant info */}
      {openRestaurant && (
        <RestaurantPane
          restaurant={openRestaurant}
          onClick={() => setOpenRestaurant()}
        />
      )}
      {/* Open info pane */}
      {openInfoPane && (
        <div className="absolute bottom-0 right-0 w-full bg-background border-t border-secondary p-4">
          <Button onClick={() => setOpenInfoPane(false)} className="absolute right-4 -top-10">
            Close
          </Button>
          <h2 className="antialiased">
            Info
          </h2>
          {infoDescription && (
            <div className="max-w-prose text-sm text-slate-800 antialiased mt-2 richTextFormatting">
              <PortableText value={infoDescription} />
            </div>
          )}
          {github && (
            <ButtonLink href={github} className="mt-4">
              Github
            </ButtonLink>
          )}
        </div>
      )}
    </div>
  );
};

export default MapWithOverlay;
