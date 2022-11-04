import { useState } from 'react';
import {
  GoogleMap,
  Marker,
  OverlayViewF,
} from '@react-google-maps/api';

const defaultZoom = 12;

const options = {
  clickableIcons: false,
  streetViewControl: false,
  fullscreenControl: false,
};

const restaurants = [
  {
    id: 'leRock',
    name: 'Le Rock',
    position: {
      lat: 40.75944188553046,
      lng: -73.97822108827445,
    },
  },
  {
    id: 'gage',
    name: 'Gage & Tollner',
    position: {
      lat: 40.69151221806449,
      lng: -73.98790391711191,
    },
  },
];

const MapWithOverlay = ({
  map,
  onLoad,
  onUnmount,
  defaultCenter,
  userPosition,
}) => {
  const [openRestaurant, setOpenRestaurant] = useState({});

  const onMarkerClick = ((e, restaurant) => {
    console.log('Marker click', e);
    console.log('Restaurant', restaurant);
    setOpenRestaurant(restaurants.find((r) => r.id === restaurant.id));
    map.panTo(restaurant.position);
  });

  return (
    <div>
      <GoogleMap
        center={defaultCenter}
        zoom={defaultZoom}
        options={options}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerClassName="w-full h-96"
      >
        {/* Restaurant markers */}
        {restaurants.length > 0 && restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={restaurant.position}
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
      {openRestaurant.id && (
        <div className="border border-slate-200 p-4">
          <h3>{openRestaurant.name}</h3>
          <button type="button" className="underline" onClick={() => setOpenRestaurant({})}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MapWithOverlay;
