import GoogleMapReact from 'google-map-react';
import { useState } from 'react';

/** This library can't be used because it hasn't been updated in 2+ years,
 *  and throws tons of errors in React 18 :(
 *  This is the source of multiple issues in their Github and it
 *  doesn't look like anyone will be maintaining it soon.
 */

const GoogleMapReactDemo = () => {
  const [openRestaurant, setOpenRestaurant] = useState({});

  const defaultProps = {
    center: {
      lat: 40.7101753,
      lng: -73.9925543,
    },
    zoom: 12,
  };

  const options = {
    clickableIcons: false,
  };

  const restaurants = [
    {
      id: 'leRock',
      name: 'Le Rock',
      lat: 40.75944188553046,
      lng: -73.97822108827445,
    },
    {
      id: 'gage',
      name: 'Gage & Tollner',
      lat: 40.69151221806449,
      lng: -73.98790391711191,
    },
  ];

  const openPopup = (key, childProps) => {
    console.log('Key', key);
    console.log('Child props', childProps);
    setOpenRestaurant(restaurants.find((r) => r.id === childProps.id));
  };

  return (
    <>
      <div className="w-full h-96">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          options={options}
          onChildClick={(key, childProps) => openPopup(key, childProps)}
        >
          {restaurants.length > 0 && restaurants.map((restaurant) => (
            <div
              lat={restaurant.lat}
              lng={restaurant.lng}
              id={restaurant.id}
              className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/50"
            >
              {/* :) */}
            </div>

          ))}
        </GoogleMapReact>
      </div>
      {openRestaurant.id && (
        <div className="border border-slate-200 p-4">
          <h3>{openRestaurant.name}</h3>
          <button type="button" className="underline" onClick={() => setOpenRestaurant({})}>Close</button>
        </div>
      )}
    </>
  );
};

export default GoogleMapReactDemo;
