import { useState } from 'react';
import {
  Autocomplete,
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

const MapWithOverlay = ({
  map,
  restaurants,
  onLoad,
  onUnmount,
  center,
  userPosition,
}) => {
  const [openRestaurant, setOpenRestaurant] = useState({});

  const onMarkerClick = ((e, restaurant) => {
    console.log('Marker click', e);
    console.log('Restaurant', restaurant);
    setOpenRestaurant(restaurants.find((r) => r._id === restaurant._id));
    map.panTo(restaurant.googleData.location);
  });

  const [autocomplete, setAutocomplete] = useState();
  const onAutocompleteLoad = (autocomp) => {
    setAutocomplete(autocomp);
  };

  const onPlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    const formattedPlace = {
      name: place.name,
      id: place.place_id,
      url: place.url,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      website: place.website,
      rating: place.rating,
      business_status: place.business_status,
    };
    console.log('Formatted place', formattedPlace);
  };

  return (
    <div>
      <GoogleMap
        center={center}
        zoom={defaultZoom}
        options={options}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerClassName="w-full h-96"
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
        {/* Autocomplete form */}
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search"
            className="absolute right-2.5 top-2.5 w-1/2 p-2 border border-lime-500"
          />
        </Autocomplete>
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
