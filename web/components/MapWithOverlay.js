import { useState, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { PortableText } from '@portabletext/react';

import CustomMarker from './CustomMarker';
import RestaurantPane from './RestaurantPane';
import ListPane from './ListPane';
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
  subtitle,
  infoDescription,
  github,
  geolocationError,
  setGeolocationError,
}) => {
  const [openPane, setOpenPane] = useState();
  const [selectedRestaurant, setSelectedRestaurant] = useState();

  const openRestaurant = (restaurant) => {
    setOpenPane('restaurant');
    setSelectedRestaurant(restaurants.find((r) => r._id === restaurant._id));

    console.log('Restaurant', restaurant);

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
  };

  const closeRestaurant = () => {
    setSelectedRestaurant();
    setOpenPane();
  };

  const openUserPane = () => {
    setOpenPane('restaurant');
    setSelectedRestaurant({
      _id: 'me',
      name: 'That\'s you :)',
      position: userPosition,
    });
    map.panTo(userPosition);
  };

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
            onClick={() => openRestaurant(restaurant)}
            selectedRestaurant={selectedRestaurant}
          />
        ))}
        {/* Current position marker */}
        {userPosition && (
          <CustomMarker
            id="me"
            label="You"
            markerStyle="secondary"
            position={userPosition}
            selectedRestaurant={selectedRestaurant}
            onClick={() => openUserPane()}
          />
        )}
      </GoogleMap>
      <div className="absolute top-2 left-2 flex flex-col text-primary-dark">
        <h1 className="text-2xl antialiased leading-tight">
          {name || 'Tables for Two'}
        </h1>
        <h2 className="font-mono text-xs font-normal">
          {subtitle || 'The New Yorker\'s Restaurant Reviews'}
        </h2>
      </div>
      {/* Alert saying that geolocation isn't enabled */}
      {/* TODO: Streamline logic when showing different states and/or
          not include all these pieces (info pane, list, errors) within the map component */}
      {geolocationError && (
        <div className="absolute bottom-8 left-2 w-auto mr-20 p-2 bg-slate-50 border border-secondary font-mono text-xs flex items-center justify-between space-x-3">
          <span>Your browser does not allow geolocation centering, sorry.</span>
          <Button onClick={() => setGeolocationError(false)}>x</Button>
        </div>
      )}
      {/* Helper buttons */}
      <div className="absolute top-3 right-3 flex space-x-4 items-center">
        {!openPane && (
          <Button onClick={() => setOpenPane('list')}>
            View List
          </Button>
        )}
        {infoDescription && !openPane && (
          <Button onClick={() => setOpenPane('info')}>
            i
          </Button>
        )}
      </div>
      {/* Open restaurant info */}
      {openPane === 'restaurant' && selectedRestaurant && (
        <RestaurantPane
          restaurant={selectedRestaurant}
          onClose={() => closeRestaurant()}
        />
      )}
      {/* Open list view */}
      {openPane === 'list' && (
        <ListPane
          restaurants={restaurants}
          onClose={() => setOpenPane()}
          openRestaurant={openRestaurant}
        />
      )}
      {/* Open info pane */}
      {openPane === 'info' && (
        <div className="absolute bottom-0 right-0 w-full sm:max-w-sm bg-primary p-4">
          <Button onClick={() => setOpenPane()} className="absolute right-4 -top-10">
            Close
          </Button>
          <h2 className="antialiased text-white">
            Info
          </h2>
          {infoDescription && (
            <div className="max-w-prose font-mono text-sm text-white antialiased mt-2 richTextFormatting">
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
