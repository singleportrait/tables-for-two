import { useState, useEffect } from 'react';
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
  geolocationError,
  setGeolocationError,
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

  const [innerHeight, setInnerHeight] = useState('0');
  useEffect(() => {
    function setPageHeight() {
      setInnerHeight(window.innerHeight);
    }

    window.addEventListener('resize', setPageHeight);

    setPageHeight();

    return () => window.removeEventListener('resize', setPageHeight);
  }, []);

  return (
    <div style={{ height: innerHeight }} className="h-screen max-h-screen relative">
      <GoogleMap
        center={center}
        zoom={defaultZoom}
        options={options}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerStyle={{ height: innerHeight }}
        mapContainerClassName="w-full h-screen max-h-screen"
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
      {/* Alert saying that geolocation isn't enabled */}
      {/* TODO: Streamline logic when showing different states and/or
          not include all these pieces (info pane, list, errors) within the map component */}
      {geolocationError && (
        <div className="absolute bottom-8 left-2 w-auto mr-20 p-2 bg-slate-50 border border-secondary font-mono text-xs flex items-center justify-between space-x-3">
          <span>Your browser does not allow geolocation centering, sorry.</span>
          <Button onClick={() => setGeolocationError(false)}>x</Button>
        </div>
      )}
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
