import { useState, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';

import CustomMarker from './CustomMarker';
import RestaurantPane from './RestaurantPane';
import ListPane from './ListPane';
import Button from './Button';
import InfoPane from './InfoPane';

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
  onLoad,
  onUnmount,
  center,
  userPosition,
  data,
  geolocationError,
}) => {
  const { name, subtitle, restaurants } = data;
  const [openPane, setOpenPane] = useState();
  const [selectedRestaurant, setSelectedRestaurant] = useState();

  const openRestaurant = (restaurant) => {
    setOpenPane('restaurant');
    setSelectedRestaurant(restaurants.find((r) => r._id === restaurant._id));

    // console.log('Restaurant', restaurant);

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
        {/* Duplicated restaurant marker for easy highest z-index effect */}
        {selectedRestaurant && (
          <CustomMarker
            id={selectedRestaurant._id}
            label={selectedRestaurant.name}
            markerStyle="primary"
            position={selectedRestaurant.googleData.location}
            selectedRestaurant={selectedRestaurant}
          />
        )}
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
      {/* Helper buttons */}
      <div className="absolute top-3 right-3 flex space-x-4 items-center">
        {!openPane && (
          <Button onClick={() => setOpenPane('list')}>
            View List
          </Button>
        )}
        {data.infoDescription && !openPane && (
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
        <InfoPane
          data={data}
          onClose={() => setOpenPane()}
          geolocationError={geolocationError}
        />
      )}
    </div>
  );
};

export default MapWithOverlay;
